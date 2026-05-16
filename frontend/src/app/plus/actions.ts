"use server";

import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import prisma from "@/lib/prisma";

export async function registerPlusInterest() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/plus");
  }

  const userId = Number(session.user.id);

  if (!Number.isInteger(userId)) {
    redirect("/login?callbackUrl=/plus");
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      plusInterest: true,
    },
  });

  redirect("/plus?interested=true");
}