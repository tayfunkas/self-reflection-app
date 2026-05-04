/*"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { createEmailVerificationToken } from "@/lib/verification-token";
import { sendVerificationEmail } from "@/lib/email";

export type SignupState = {
  error?: string;
};

export async function signup(
  _prevState: SignupState,
  formData: FormData
): Promise<SignupState> {
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";

  if (!email || !password || !confirmPassword) {
    return { error: "Please fill in all fields." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      emailVerified: true,
    },
  });

  if (existingUser?.emailVerified) {
    return { error: "An account with this email already exists." };
  }

  const passwordHash = await hashPassword(password);

  if (!existingUser) {
    await prisma.user.create({
      data: {
        email,
        passwordHash,
        emailVerified: null,
      },
    });
  } else {
    await prisma.user.update({
      where: { email },
      data: {
        passwordHash,
      },
    });
  }

  const verificationToken = await createEmailVerificationToken(email);
  await sendVerificationEmail(email, verificationToken.token);

  redirect(`/check-inbox?email=${encodeURIComponent(email)}`);
}*/

"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { createEmailVerificationToken } from "@/lib/verification-token";
import { sendVerificationEmail } from "@/lib/email";
import { signupRateLimit, getRateLimitIdentifier } from "@/lib/rate-limit";
import { auth } from "../../../auth";

export type SignupState = {
  error?: string;
};

const MAX_EMAIL_LENGTH = 254;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 72;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function signup(
  _prevState: SignupState,
  formData: FormData
): Promise<SignupState> {
  const session = await auth();

  if (session?.user?.id) {
    redirect("/today");
  }

  const identifier = await getRateLimitIdentifier("signup");
  const { success } = await signupRateLimit.limit(identifier);

  if (!success) {
    return { error: "Too many signup attempts. Please try again later." };
  }
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";

  if (!email || !password || !confirmPassword) {
    return { error: "Please fill in all fields." };
  }

  if (email.length > MAX_EMAIL_LENGTH || !isValidEmail(email)) {
    return { error: "Please enter a valid email address." };
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return { error: "Password must be at least 8 characters." };
  }

  if (password.length > MAX_PASSWORD_LENGTH) {
    return { error: "Password is too long." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      emailVerified: true,
    },
  });

  if (existingUser?.emailVerified) {
    return { error: "An account with this email already exists." };
  }

  const passwordHash = await hashPassword(password);

  if (!existingUser) {
    await prisma.user.create({
      data: {
        email,
        passwordHash,
        emailVerified: null,
      },
    });
  } else {
    await prisma.user.update({
      where: { email },
      data: {
        passwordHash,
      },
    });
  }

  const verificationToken = await createEmailVerificationToken(email);
  await sendVerificationEmail(email, verificationToken.token);

  redirect(`/check-inbox?email=${encodeURIComponent(email)}`);
}