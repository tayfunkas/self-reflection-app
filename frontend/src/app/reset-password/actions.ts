"use server";

import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import {
  getEmailFromPasswordResetIdentifier,
  isPasswordResetIdentifier,
} from "@/lib/password-reset-token";

function resetError(token: string, message: string) {
  redirect(
    `/reset-password?token=${encodeURIComponent(token)}&error=${encodeURIComponent(
      message
    )}`
  );
}

export async function resetPassword(formData: FormData) {
  const token = formData.get("token")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";

  if (!token) {
    redirect("/forgot-password?sent=1");
  }

  if (!password || !confirmPassword) {
    resetError(token, "Please fill in all fields.");
  }

  if (password.length < 8) {
    resetError(token, "Password must be at least 8 characters.");
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