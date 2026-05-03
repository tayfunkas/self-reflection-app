/*import prisma from "@/lib/prisma";

export async function createResponseForDelivery(
  deliveryId: number,
  responseText: string
) {
  if (!Number.isInteger(deliveryId) || deliveryId <= 0) {
    throw new Error("Invalid deliveryId");
  }

  const trimmedResponseText = responseText.trim();

  if (!trimmedResponseText) {
    throw new Error("Response text is required");
  }

  const delivery = await prisma.questionDelivery.findUnique({
    where: {
      id: deliveryId,
    },
    include: {
      response: true,
    },
  });

  if (!delivery) {
    throw new Error("Delivery not found");
  }

  if (delivery.response) {
    throw new Error("A response already exists for this delivery");
  }

  const now = new Date();

  if (delivery.expiresAt && delivery.expiresAt < now) {
    throw new Error("This question has expired");
  }

  const [response] = await prisma.$transaction([
    prisma.response.create({
      data: {
        userId: delivery.userId,
        questionId: delivery.questionId,
        deliveryId: delivery.id,
        responseText: trimmedResponseText,
      },
    }),
    prisma.questionDelivery.update({
      where: {
        id: delivery.id,
      },
      data: {
        status: "answered",
      },
    }),
  ]);

  return response;
}*/

import prisma from "@/lib/prisma";

const MAX_RESPONSE_LENGTH = 5000;

export async function createResponseForDelivery(
  deliveryId: number,
  responseText: string
) {
  if (!Number.isInteger(deliveryId) || deliveryId <= 0) {
    throw new Error("Invalid deliveryId");
  }

  const trimmedResponseText = responseText.trim();

  if (!trimmedResponseText) {
    throw new Error("Response text is required");
  }

  if (trimmedResponseText.length > MAX_RESPONSE_LENGTH) {
    throw new Error("Response text is too long");
  }

  const delivery = await prisma.questionDelivery.findUnique({
    where: {
      id: deliveryId,
    },
    include: {
      response: true,
    },
  });

  if (!delivery) {
    throw new Error("Delivery not found");
  }

  if (delivery.userId <= 0 || delivery.questionId <= 0) {
    throw new Error("Invalid delivery data");
  }

  if (delivery.response) {
    throw new Error("A response already exists for this delivery");
  }

  if (delivery.status !== "active") {
    throw new Error("This question is no longer active");
  }

  const now = new Date();

  if (delivery.expiresAt && delivery.expiresAt < now) {
    throw new Error("This question has expired");
  }

  const [response] = await prisma.$transaction([
    prisma.response.create({
      data: {
        userId: delivery.userId,
        questionId: delivery.questionId,
        deliveryId: delivery.id,
        responseText: trimmedResponseText,
      },
    }),

    prisma.questionDelivery.update({
      where: {
        id: delivery.id,
      },
      data: {
        status: "answered",
      },
    }),
  ]);

  return response;
}