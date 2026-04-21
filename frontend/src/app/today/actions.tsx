/*"use server";

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
}*/

/*"use server";

import { revalidatePath } from "next/cache";
import { createResponseForDelivery } from "@/lib/response-service";

export async function submitResponse(formData: FormData) {
  const deliveryIdValue = formData.get("deliveryId");
  const responseTextValue = formData.get("responseText");

  const deliveryId = Number(deliveryIdValue);
  const responseText = responseTextValue?.toString() ?? "";

  await createResponseForDelivery(deliveryId, responseText);

  revalidatePath("/today");
}*/

"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "../../../auth";
import { createResponseForDelivery } from "@/lib/response-service";
import prisma from "@/lib/prisma";

export async function submitResponse(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const deliveryIdValue = formData.get("deliveryId");
  const responseTextValue = formData.get("responseText");

  const deliveryId = Number(deliveryIdValue);
  const responseText = responseTextValue?.toString() ?? "";
  const userId = Number(session.user.id);

  if (!Number.isInteger(deliveryId) || deliveryId <= 0) {
    throw new Error("Invalid delivery id");
  }

  const delivery = await prisma.questionDelivery.findUnique({
    where: { id: deliveryId },
    select: { userId: true },
  });

  if (!delivery) {
    throw new Error("Delivery not found");
  }

  if (delivery.userId !== userId) {
    throw new Error("Unauthorized");
  }

  await createResponseForDelivery(deliveryId, responseText);

  revalidatePath("/today");
}