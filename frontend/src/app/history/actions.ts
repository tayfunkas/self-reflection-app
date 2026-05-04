"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../../../auth";
import prisma from "@/lib/prisma";

export async function deleteReflection(responseId: number) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in.");
  }

  const userId = Number(session.user.id);

  const response = await prisma.response.findFirst({
    where: {
      id: responseId,
      userId,
    },
    select: {
      id: true,
      deliveryId: true,
      questionId: true,
    },
  });

  if (!response) {
    throw new Error("Reflection not found.");
  }

  await prisma.$transaction([
    prisma.response.delete({
      where: {
        id: response.id,
      },
    }),

    prisma.questionDelivery.update({
      where: {
        id: response.deliveryId,
      },
      data: {
        status: "response_deleted",
      },
    }),

    prisma.questionStats.upsert({
      where: {
        questionId: response.questionId,
      },
      update: {
        responseDeletedCount: {
          increment: 1,
        },
      },
      create: {
        questionId: response.questionId,
        responseDeletedCount: 1,
      },
    }),
  ]);

  revalidatePath("/history");
}