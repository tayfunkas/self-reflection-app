/*"use server";

import AuthError from "next-auth";
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

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/today",
    });

    return {};
  } catch (error) {
    if (error instanceof AuthError) {
        return { error: "Invalid email or password." };
      }
      
      throw error;
  }
}*/

/*
"use server";

import { signIn } from "../../../auth";

export type LoginState = {
  error?: string;
};

function isInvalidLoginError(error: unknown) {
  if (!(error instanceof Error)) return false;

  const maybeAuthError = error as Error & { type?: string };

  return (
    maybeAuthError.type === "CredentialsSignin" ||
    maybeAuthError.type === "CallbackRouteError" ||
    error.message.includes("CredentialsSignin") ||
    error.message.includes("CallbackRouteError")
  );
}

function isRedirectError(error: unknown) {
  return error instanceof Error && error.message.includes("NEXT_REDIRECT");
}

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  if (!email || !password) {
    return { error: "Please enter your email and password." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/today",
    });

    return {};
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (isInvalidLoginError(error)) {
      return { error: "Invalid email or password." };
    }

    return { error: "Something went wrong. Please try again." };
  }
}*/

/*"use server";

import { AuthError } from "next-auth";
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

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/today",
    });

    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password." };
    }

    throw error;
  }
}*/

/*"use server";

import { signIn } from "../../../auth";

export type LoginState = {
  error?: string;
};

function isRedirectError(error: unknown) {
  return error instanceof Error && error.message.includes("NEXT_REDIRECT");
}

function isInvalidLoginError(error: unknown) {
  if (!(error instanceof Error)) return false;

  return (
    error.message.includes("CredentialsSignin") ||
    error.message.includes("CallbackRouteError")
  );
}

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  if (!email || !password) {
    return { error: "Please enter your email and password." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/today",
    });

    return {};
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (isInvalidLoginError(error)) {
      return { error: "Invalid email or password." };
    }

    return { error: "Something went wrong. Please try again." };
  }
}*/

/*"use server";

import { signIn } from "../../../auth";

export type LoginState = {
  error?: string;
  success?: boolean;
};

function isRedirectError(error: unknown) {
  return error instanceof Error && error.message.includes("NEXT_REDIRECT");
}

function isInvalidLoginError(error: unknown) {
  if (!(error instanceof Error)) return false;

  return (
    error.message.includes("CredentialsSignin") ||
    error.message.includes("CallbackRouteError")
  );
}

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  if (!email || !password) {
    return { error: "Please enter your email and password." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (isInvalidLoginError(error)) {
      return { error: "Invalid email or password." };
    }

    console.error("[login action] unexpected error:", error);
    return { error: "Something went wrong. Please try again." };
  }
}*/

/*"use server";

import { AuthError } from "next-auth";
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

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/today",
    });

    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
        case "CallbackRouteError":
          return { error: "Invalid email or password." };
        default:
          return { error: "Authentication failed. Please try again." };
      }
    }

    throw error;
  }
}*/

/*"use server";

import { AuthError } from "next-auth";
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
        "cause" in error &&
        error.cause &&
        typeof error.cause === "object" &&
        "err" in error.cause &&
        error.cause.err instanceof Error &&
        error.cause.err.name === "EmailNotVerifiedError"
      ) {
        return { error: "Please verify your email before logging in." };
      }

      switch (error.type) {
        case "CredentialsSignin":
        case "CallbackRouteError":
          return { error: "Invalid email or password." };
        default:
          return { error: "Authentication failed. Please try again." };
      }
    }

    throw error;
  }
}*/

"use server";

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
}