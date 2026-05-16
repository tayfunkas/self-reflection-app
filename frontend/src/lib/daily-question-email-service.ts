/*import prisma from "@/lib/prisma";
import { getOrCreateTodayDelivery } from "@/lib/question-delivery";
import { sendDailyQuestionEmail } from "@/lib/email";

function getLocalHourMinute(timezone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

function isDeliveryTimeDue(preferredTime: string, timezone: string) {
  const localTime = getLocalHourMinute(timezone);

  return localTime === preferredTime;
}

export async function sendDueDailyQuestionEmails() {
  const users = await prisma.user.findMany({
    where: {
      dailyQuestionEmails: true,
      emailVerified: {
        not: null,
      },
    },
    select: {
      id: true,
      email: true,
      timezone: true,
      dailyReflectionTime: true,
    },
  });

  let sentCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const user of users) {
    try {
        console.log({
            userId: user.id,
            email: user.email,
            timezone: user.timezone,
            preferred: user.dailyReflectionTime,
            localNow: getLocalHourMinute(user.timezone),
          });
      if (!isDeliveryTimeDue(user.dailyReflectionTime, user.timezone)) {
        skippedCount++;
        continue;
      }

      const delivery = await getOrCreateTodayDelivery(user.id);

      if (delivery.emailSentAt) {
        skippedCount++;
        console.log("Skipping time check for local test");
        continue;
      }

      await sendDailyQuestionEmail(user.email, delivery.question.text);

      await prisma.questionDelivery.update({
        where: {
          id: delivery.id,
        },
        data: {
          emailSentAt: new Date(),
        },
      });

      sentCount++;
    } catch (error) {
      console.error(`Daily question email failed for user ${user.id}:`, error);
      failedCount++;
    }
  }

  return {
    sentCount,
    skippedCount,
    failedCount,
  };
}*/

import prisma from "@/lib/prisma";
import { getOrCreateTodayDelivery } from "@/lib/question-delivery";
import { sendDailyQuestionEmail } from "@/lib/email";

const DELIVERY_WINDOW_MINUTES = 60;

function getLocalHourMinute(timezone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

function isDeliveryTimeDue(preferredTime: string, timezone: string) {
  const localTime = getLocalHourMinute(timezone);

  const preferredMinutes = timeToMinutes(preferredTime);
  const currentMinutes = timeToMinutes(localTime);

  return (
    currentMinutes >= preferredMinutes &&
    currentMinutes < preferredMinutes + DELIVERY_WINDOW_MINUTES
  );
}

export async function sendDueDailyQuestionEmails() {
  const users = await prisma.user.findMany({
    where: {
      dailyQuestionEmails: true,
      emailVerified: {
        not: null,
      },
    },
    select: {
      id: true,
      email: true,
      timezone: true,
      dailyReflectionTime: true,
    },
  });

  let sentCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const user of users) {
    try {
      const localNow = getLocalHourMinute(user.timezone);

      console.log({
        userId: user.id,
        email: user.email,
        timezone: user.timezone,
        preferred: user.dailyReflectionTime,
        localNow,
      });

      if (!isDeliveryTimeDue(user.dailyReflectionTime, user.timezone)) {
        skippedCount++;
        continue;
      }

      const delivery = await getOrCreateTodayDelivery(user.id);

      if (delivery.emailSentAt) {
        console.log(`Daily question email already sent for user ${user.id}`);
        skippedCount++;
        continue;
      }

      await sendDailyQuestionEmail(user.email, delivery.question.text);

      await prisma.questionDelivery.update({
        where: {
          id: delivery.id,
        },
        data: {
          emailSentAt: new Date(),
        },
      });

      console.log(`Daily question email sent for user ${user.id}`);

      sentCount++;
    } catch (error) {
      console.error(`Daily question email failed for user ${user.id}:`, error);
      failedCount++;
    }
  }

  return {
    sentCount,
    skippedCount,
    failedCount,
  };
}