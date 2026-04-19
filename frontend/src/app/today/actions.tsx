"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitResponse(formData: FormData) {
  const deliveryIdValue = formData.get("deliveryId");
  const responseTextValue = formData.get("responseText");

  const deliveryId = Number(deliveryIdValue);
  const responseText = responseTextValue?.toString().trim();

  if (!deliveryId || !responseText) {
    throw new Error("Missing deliveryId or responseText");
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

  await prisma.response.create({
    data: {
      userId: delivery.userId,
      questionId: delivery.questionId,
      deliveryId: delivery.id,
      responseText,
    },
  });

  revalidatePath("/today");
}