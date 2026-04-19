/*import prisma from "@/lib/prisma";

const TEST_USER_EMAIL = "test@example.com";

export async function getTestUser() {
  const user = await prisma.user.findUnique({
    where: {
      email: TEST_USER_EMAIL,
    },
  });

  if (!user) {
    throw new Error("Test user not found");
  }

  return user;
}

export async function getOrCreateTodayDelivery(userId: number) {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const existingDelivery = await prisma.questionDelivery.findFirst({
    where: {
      userId,
      deliveredAt: {
        gte: startOfToday,
        lte: endOfToday,
      },
    },
    include: {
      question: true,
      response: true,
    },
    orderBy: {
      deliveredAt: "desc",
    },
  });

  if (existingDelivery) {
    return existingDelivery;
  }

  const deliveredQuestionIds = await prisma.questionDelivery.findMany({
    where: { userId },
    select: { questionId: true },
  });

  const usedQuestionIds = deliveredQuestionIds.map((item) => item.questionId);

  const nextQuestion = await prisma.question.findFirst({
    where: {
      isActive: true,
      ...(usedQuestionIds.length > 0
        ? {
            id: {
              notIn: usedQuestionIds,
            },
          }
        : {}),
    },
    orderBy: {
      id: "asc",
    },
  });

  if (!nextQuestion) {
    throw new Error("No active question available for delivery");
  }

  const newDelivery = await prisma.questionDelivery.create({
    data: {
      userId,
      questionId: nextQuestion.id,
      status: "delivered",
    },
    include: {
      question: true,
      response: true,
    },
  });

  return newDelivery;
}*/

import prisma from "@/lib/prisma";

const TEST_USER_EMAIL = "test@example.com";
const ONBOARDING_RESPONSE_LIMIT = 5;
const EXPIRED_COOLDOWN_DAYS = 40;

export async function getTestUser() {
  const user = await prisma.user.findUnique({
    where: {
      email: TEST_USER_EMAIL,
    },
  });

  if (!user) {
    throw new Error("Test user not found");
  }

  return user;
}

function getTodayBounds() {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  return { startOfToday, endOfToday };
}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

type DeliveryWithResponse = {
  id: number;
  questionId: number;
  deliveredAt: Date;
  expiresAt: Date | null;
  status: string;
  response: { id: number } | null;
};

function pickRandom<T>(items: T[]): T | null {
  if (items.length === 0) return null;
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

export async function getOrCreateTodayDelivery(userId: number) {
  const now = new Date();
  const { startOfToday, endOfToday } = getTodayBounds();

  // 1. Reuse today's delivery if it already exists
  const existingDelivery = await prisma.questionDelivery.findFirst({
    where: {
      userId,
      deliveredAt: {
        gte: startOfToday,
        lte: endOfToday,
      },
    },
    include: {
      question: true,
      response: true,
    },
    orderBy: {
      deliveredAt: "desc",
    },
  });

  if (existingDelivery) {
    return existingDelivery;
  }

  // 2. Count submitted responses for onboarding
  const responseCount = await prisma.response.count({
    where: { userId },
  });

  const isOnboarding = responseCount < ONBOARDING_RESPONSE_LIMIT;

  // 3. Load all eligible base questions
  const candidateQuestions = await prisma.question.findMany({
    where: {
      isActive: true,
      ...(isOnboarding
        ? {
            depthLevel: {
              in: [1, 2],
            },
            firstPhaseAllowed: true,
          }
        : {}),
    },
    orderBy: {
      id: "asc",
    },
  });

  if (candidateQuestions.length === 0) {
    throw new Error("No eligible questions found");
  }

  // 4. Load this user's full delivery history
  const deliveries = await prisma.questionDelivery.findMany({
    where: { userId },
    include: {
      response: true,
    },
    orderBy: {
      deliveredAt: "desc",
    },
  });

  // 5. Build latest delivery map per question
  const latestDeliveryByQuestionId = new Map<number, DeliveryWithResponse>();

  for (const delivery of deliveries) {
    if (!latestDeliveryByQuestionId.has(delivery.questionId)) {
      latestDeliveryByQuestionId.set(delivery.questionId, delivery);
    }
  }

  const unseenQuestions = [];
  const reusableAnsweredQuestions = [];
  const reusableExpiredQuestions = [];

  for (const question of candidateQuestions) {
    const latestDelivery = latestDeliveryByQuestionId.get(question.id);

    // Never delivered before -> best option
    if (!latestDelivery) {
      unseenQuestions.push(question);
      continue;
    }

    const wasAnswered = !!latestDelivery.response;
    const isExpiredUnanswered =
      !latestDelivery.response &&
      latestDelivery.expiresAt !== null &&
      latestDelivery.expiresAt < now;

    // Answered before: allow only if question can reappear and wait time passed
    if (wasAnswered) {
      if (!question.canReappear) {
        continue;
      }

      const waitDays = question.reappearAfterDays ?? 0;
      const availableAgainAt = addDays(latestDelivery.deliveredAt, waitDays);

      if (availableAgainAt <= now) {
        reusableAnsweredQuestions.push(question);
      }

      continue;
    }

    // Expired unanswered: allow only after long cooldown
    if (isExpiredUnanswered) {
      const availableAgainAt = addDays(
        latestDelivery.expiresAt!,
        EXPIRED_COOLDOWN_DAYS
      );

      if (availableAgainAt <= now) {
        reusableExpiredQuestions.push(question);
      }

      continue;
    }

    // If not answered and not expired, it was likely an older active delivery.
    // Since we already checked for today's delivery, ignore these for now.
  }

  // 6. Pick question by priority
  const selectedQuestion =
    pickRandom(unseenQuestions) ??
    pickRandom(reusableAnsweredQuestions) ??
    pickRandom(reusableExpiredQuestions);

  if (!selectedQuestion) {
    throw new Error("No active question available for delivery");
  }

  // 7. Create today's delivery
  const newDelivery = await prisma.questionDelivery.create({
    data: {
      userId,
      questionId: selectedQuestion.id,
      status: "delivered",
      expiresAt: endOfToday, // calendar-day approach
    },
    include: {
      question: true,
      response: true,
    },
  });

  return newDelivery;
}