"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

import { auth } from "../../../auth";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import {
  passwordChangeRateLimit,
  getRateLimitIdentifier,
} from "@/lib/rate-limit";

function passwordChangeError(message: string): never {
  redirect(`/password-change?error=${encodeURIComponent(message)}`);
}

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 72;

export async function changePassword(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const identifier = await getRateLimitIdentifier("password-change");
  const { success } = await passwordChangeRateLimit.limit(identifier);

  if (!success) {
    redirect("/password-change?error=Too many attempts. Please try again later.");
  }

  const userId = Number(session.user.id);

  if (!Number.isInteger(userId) || userId <= 0) {
    redirect("/login");
  }

  const currentPassword = formData.get("currentPassword")?.toString() ?? "";
  const newPassword = formData.get("newPassword")?.toString() ?? "";
  const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";

  if (!currentPassword || !newPassword || !confirmPassword) {
    passwordChangeError("Please fill in all fields.");
  }

  if (currentPassword.length > MAX_PASSWORD_LENGTH) {
    passwordChangeError("Current password is incorrect.");
  }

  if (newPassword.length < MIN_PASSWORD_LENGTH) {
    passwordChangeError("Password must be at least 8 characters.");
  }

  if (newPassword.length > MAX_PASSWORD_LENGTH) {
    passwordChangeError("Password is too long.");
  }

  if (newPassword !== confirmPassword) {
    passwordChangeError("Passwords do not match.");
  }

  if (currentPassword === newPassword) {
    passwordChangeError("New password must be different from current password.");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      passwordHash: true,
    },
  });

  if (!user?.passwordHash) {
    passwordChangeError("Password cannot be changed for this account.");
  }

  const passwordMatches = await bcrypt.compare(
    currentPassword,
    user.passwordHash
  );

  if (!passwordMatches) {
    passwordChangeError("Current password is incorrect.");
  }

  const passwordHash = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash },
  });

  redirect("/password-change?success=1");
}