/*"use server";

import { redirect } from "next/navigation";
import  prisma  from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { createEmailVerificationToken } from "@/lib/verification-token";
import { sendVerificationEmail } from "@/lib/email";

type SignupState = {
  error?: string;
};

export async function signup(
  prevState: SignupState,
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
  });

  if (existingUser) {
    if (existingUser.emailVerified) {
      return { error: "An account with this email already exists." };
    }

    const verificationToken = await createEmailVerificationToken(email);
    await sendVerificationEmail(email, verificationToken.token);

    redirect("/verify-request");
  }

  const passwordHash = await hashPassword(password);

  await prisma.user.create({
    data: {
      email,
      passwordHash,
      emailVerified: null,
    },
  });

  const verificationToken = await createEmailVerificationToken(email);
  await sendVerificationEmail(email, verificationToken.token);

  redirect("/verify-request");
}*/

/*"use server";

import { redirect } from "next/navigation";
import  prisma  from "@/lib/prisma";
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
  });

  if (existingUser) {
    if (existingUser.emailVerified) {
      return { error: "An account with this email already exists." };
    }

    const verificationToken = await createEmailVerificationToken(email);
    await sendVerificationEmail(email, verificationToken.token);

    redirect("/verify-request");
  }

  const passwordHash = await hashPassword(password);

  await prisma.user.create({
    data: {
      email,
      passwordHash,
      emailVerified: null,
    },
  });

  const verificationToken = await createEmailVerificationToken(email);
  await sendVerificationEmail(email, verificationToken.token);

  redirect("/verify-request");
}*/

/*"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

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
  });

  if (existingUser) {
    return { error: "An account with this email already exists." };
  }

  const passwordHash = await hashPassword(password);

  await prisma.user.create({
    data: {
      email,
      passwordHash,
      emailVerified: new Date(),
    },
  });

  redirect("/login");
}*/

"use server";

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
}