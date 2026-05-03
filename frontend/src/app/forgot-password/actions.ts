/*"use server";

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
}*/

"use server";

import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { createPasswordResetToken } from "@/lib/password-reset-token";
import { sendPasswordResetEmail } from "@/lib/email";
import {
  forgotPasswordRateLimit,
  getRateLimitIdentifier,
} from "@/lib/rate-limit";

const MAX_EMAIL_LENGTH = 254;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function requestPasswordReset(formData: FormData) {
  const identifier = await getRateLimitIdentifier("forgot-password");
  const { success } = await forgotPasswordRateLimit.limit(identifier);

  if (!success) {
    redirect("/forgot-password?sent=1");
  }
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";

  if (!email || email.length > MAX_EMAIL_LENGTH || !isValidEmail(email)) {
    redirect("/forgot-password?sent=1");
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