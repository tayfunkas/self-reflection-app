/*"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "../../../auth";

export type LoginState = {
  error?: string;
};

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  if (!email || !password) {
    return { error: "Please enter your email and password." };
  }

  let shouldRedirectToCheckInbox = false;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/today",
    });

    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      if (
        error.type === "CredentialsSignin" &&
        "code" in error &&
        error.code === "email_not_verified"
      ) {
        shouldRedirectToCheckInbox = true;
      } else {
        return { error: "Invalid email or password." };
      }
    } else {
      throw error;
    }
  }

  if (shouldRedirectToCheckInbox) {
    redirect(`/check-inbox?email=${encodeURIComponent(email)}`);
  }

  return {};
}*/

"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "../../../auth";
import { loginRateLimit, getRateLimitIdentifier } from "@/lib/rate-limit";

export type LoginState = {
  error?: string;
};

const MAX_EMAIL_LENGTH = 254;
const MAX_PASSWORD_LENGTH = 72;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const identifier = await getRateLimitIdentifier("login");
  const { success } = await loginRateLimit.limit(identifier);

  if (!success) {
    return { error: "Too many attempts. Please try again later." };
  }
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  if (!email || !password) {
    return { error: "Please enter your email and password." };
  }

  if (email.length > MAX_EMAIL_LENGTH || !isValidEmail(email)) {
    return { error: "Invalid email or password." };
  }

  if (password.length > MAX_PASSWORD_LENGTH) {
    return { error: "Invalid email or password." };
  }

  let shouldRedirectToCheckInbox = false;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/today",
    });

    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      if (
        error.type === "CredentialsSignin" &&
        "code" in error &&
        error.code === "email_not_verified"
      ) {
        shouldRedirectToCheckInbox = true;
      } else {
        return { error: "Invalid email or password." };
      }
    } else {
      throw error;
    }
  }

  if (shouldRedirectToCheckInbox) {
    redirect(`/check-inbox?email=${encodeURIComponent(email)}`);
  }

  return {};
}