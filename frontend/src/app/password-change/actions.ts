"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

import { auth } from "../../../auth";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

function passwordChangeError(message: string): never {
    redirect(`/password-change?error=${encodeURIComponent(message)}`);
  }

export async function changePassword(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = Number(session.user.id);

  const currentPassword = formData.get("currentPassword")?.toString() ?? "";
  const newPassword = formData.get("newPassword")?.toString() ?? "";
  const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";

  if (!currentPassword || !newPassword || !confirmPassword) {
    passwordChangeError("Please fill in all fields.");
  }

  if (newPassword.length < 8) {
    passwordChangeError("Password must be at least 8 characters.");
  }

  if (newPassword !== confirmPassword) {
    passwordChangeError("Passwords do not match.");
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