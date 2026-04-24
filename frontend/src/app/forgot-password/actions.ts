"use server";

import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { createPasswordResetToken } from "@/lib/password-reset-token";
import { sendPasswordResetEmail } from "@/lib/email";

export async function requestPasswordReset(formData: FormData) {
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";

  if (!email) {
    redirect("/forgot-password");
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      email: true,
      emailVerified: true,
    },
  });

  if (user?.emailVerified) {
    const passwordResetToken = await createPasswordResetToken(email);

    await sendPasswordResetEmail(email, passwordResetToken.token);
  }

  redirect("/forgot-password?sent=1");
}