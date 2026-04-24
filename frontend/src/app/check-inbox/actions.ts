"use server";

import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { createEmailVerificationToken } from "@/lib/verification-token";
import { sendVerificationEmail } from "@/lib/email";

export async function resendVerificationEmail(formData: FormData) {
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";

  if (!email) {
    redirect("/signup");
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      email: true,
      emailVerified: true,
    },
  });

  if (!user) {
    redirect("/signup");
  }

  if (user.emailVerified) {
    redirect("/login");
  }

  const verificationToken = await createEmailVerificationToken(email);

  await sendVerificationEmail(email, verificationToken.token);

  redirect(`/check-inbox?email=${encodeURIComponent(email)}&resent=1`);
}