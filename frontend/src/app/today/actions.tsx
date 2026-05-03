/*"use server";

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
}*/

"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "../../../auth";
import { createResponseForDelivery } from "@/lib/response-service";
import prisma from "@/lib/prisma";

const MAX_RESPONSE_LENGTH = 5000;

export async function submitResponse(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = Number(session.user.id);

  if (!Number.isInteger(userId) || userId <= 0) {
    redirect("/login");
  }

  const deliveryIdValue = formData.get("deliveryId");
  const responseTextValue = formData.get("responseText");

  const deliveryId = Number(deliveryIdValue);

  if (!Number.isInteger(deliveryId) || deliveryId <= 0) {
    throw new Error("Invalid delivery id");
  }

  if (typeof responseTextValue !== "string") {
    throw new Error("Invalid response");
  }

  const responseText = responseTextValue.trim();

  if (responseText.length === 0) {
    throw new Error("Reflection cannot be empty");
  }

  if (responseText.length > MAX_RESPONSE_LENGTH) {
    throw new Error("Reflection is too long");
  }

  const delivery = await prisma.questionDelivery.findUnique({
    where: { id: deliveryId },
    select: {
      id: true,
      userId: true,
      expiresAt: true,
      status: true,
      response: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!delivery) {
    throw new Error("Delivery not found");
  }

  if (delivery.userId !== userId) {
    throw new Error("Unauthorized");
  }

  if (delivery.response) {
    throw new Error("You have already answered this question");
  }

  if (delivery.status !== "active") {
    throw new Error("This question is no longer active");
  }

  if (delivery.expiresAt && delivery.expiresAt < new Date()) {
    throw new Error("This question has expired");
  }

  await createResponseForDelivery(deliveryId, responseText);

  revalidatePath("/today");
}