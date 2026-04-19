import prisma from "@/lib/prisma";

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
}