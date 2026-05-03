"use server";

import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import {
  getEmailFromPasswordResetIdentifier,
  isPasswordResetIdentifier,
} from "@/lib/password-reset-token";
import {
  resetPasswordRateLimit,
  getRateLimitIdentifier,
} from "@/lib/rate-limit";

function resetError(token: string, message: string) {
  redirect(
    `/reset-password?token=${encodeURIComponent(token)}&error=${encodeURIComponent(
      message
    )}`
  );
}

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 72;
const MAX_TOKEN_LENGTH = 255;

export async function resetPassword(formData: FormData) {

  const identifier = await getRateLimitIdentifier("reset-password");
  const { success } = await resetPasswordRateLimit.limit(identifier);

  if (!success) {
    redirect("/forgot-password?sent=1");
  }

  const token = formData.get("token")?.toString().trim() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";

  if (!token || token.length > MAX_TOKEN_LENGTH) {
    redirect("/forgot-password?sent=1");
  }

  if (!password || !confirmPassword) {
    resetError(token, "Please fill in all fields.");
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    resetError(token, "Password must be at least 8 characters.");
  }

  if (password.length > MAX_PASSWORD_LENGTH) {
    resetError(token, "Password is too long.");
  }

  if (password !== confirmPassword) {
    resetError(token, "Passwords do not match.");
  }

  const resetToken = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (
    !resetToken ||
    resetToken.expires < new Date() ||
    !isPasswordResetIdentifier(resetToken.identifier)
  ) {
    redirect("/forgot-password?sent=1");
  }

  const email = getEmailFromPasswordResetIdentifier(resetToken.identifier);
  const passwordHash = await hashPassword(password);

  await prisma.user.update({
    where: { email },
    data: { passwordHash },
  });

  await prisma.verificationToken.delete({
    where: { token },
  });

  redirect("/login?passwordReset=1");
}