"use server";

/*import { revalidatePath } from "next/cache";
import { auth } from "../../../auth";
import prisma from "@/lib/prisma";

export async function updateProfile(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = Number(session.user.id);

  const name = formData.get("name")?.toString().trim() || null;
  const city = formData.get("city")?.toString().trim() || null;
  const countryCode = formData.get("countryCode")?.toString() || null;
  const language = formData.get("language")?.toString() || "en";
  const timezone = formData.get("timezone")?.toString() || "UTC";
  const dailyReflectionTime =
    formData.get("dailyReflectionTime")?.toString() || "00:00";

  const marketingEmails = formData.get("marketingEmails") === "on";
  const dailyQuestionEmails = formData.get("dailyQuestionEmails") === "on";

  await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      city,
      countryCode,
      language,
      timezone,
      dailyReflectionTime,
      marketingEmails,
      dailyQuestionEmails,
    },
  });

  revalidatePath("/profile");
}*/

/*"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../../../auth";
import prisma from "@/lib/prisma";

function isValidHourTime(value: string | null | undefined) {
  if (!value) return false;
  return /^([01]\d|2[0-3]):00$/.test(value);
}

export async function updateProfile(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = Number(session.user.id);

  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      city: true,
      countryCode: true,
      timezone: true,
      language: true,
      marketingEmails: true,
      dailyQuestionEmails: true,
      dailyReflectionTime: true,
    },
  });

  if (!currentUser) {
    throw new Error("User not found");
  }

  const rawName = formData.get("name")?.toString().trim();
  const rawCity = formData.get("city")?.toString().trim();
  const rawCountryCode = formData.get("countryCode")?.toString().trim();
  const rawLanguage = formData.get("language")?.toString().trim();
  const rawTimezone = formData.get("timezone")?.toString().trim();
  const rawDailyReflectionTime = formData
    .get("dailyReflectionTime")
    ?.toString()
    .trim();

  const marketingEmails = formData.get("marketingEmails") === "on";
  const dailyQuestionEmails = formData.get("dailyQuestionEmails") === "on";

  const name = rawName ? rawName : null;
  const city = rawCity ? rawCity : null;
  const countryCode = rawCountryCode ? rawCountryCode.toUpperCase() : null;
  const language = rawLanguage || currentUser.language || "en";
  const timezone = rawTimezone || currentUser.timezone || "UTC";

  const dailyReflectionTime = isValidHourTime(rawDailyReflectionTime)
    ? rawDailyReflectionTime
    : currentUser.dailyReflectionTime || "00:00";

  console.log("PROFILE FORM DATA:", Object.fromEntries(formData.entries()));

  await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      city,
      countryCode,
      language,
      timezone,
      marketingEmails,
      dailyQuestionEmails,
      dailyReflectionTime,
    },
  });

  revalidatePath("/profile");
}*/

/*"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../../../auth";
import prisma from "@/lib/prisma";

function isValidCountryCode(value: string | null | undefined) {
  return !!value && /^[A-Z]{2}$/.test(value);
}

function isValidHourTime(value: string | null | undefined) {
  return !!value && /^([01]\d|2[0-3]):00$/.test(value);
}

async function getUserId() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return Number(session.user.id);
}

export async function updateProfileBasics(formData: FormData) {
  const userId = await getUserId();

  const rawName = formData.get("name")?.toString().trim() || "";
  const rawCity = formData.get("city")?.toString().trim() || "";
  const rawCountryCode = formData.get("countryCode")?.toString().trim() || "";

  const name = rawName || null;
  const city = rawCity || null;
  const countryCode = isValidCountryCode(rawCountryCode)
    ? rawCountryCode.toUpperCase()
    : null;

  console.log("PROFILE BASICS FORM DATA:", Object.fromEntries(formData.entries()));

  await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      city,
      countryCode,
    },
  });

  revalidatePath("/profile");
}

export async function updatePreferences(formData: FormData) {
  const userId = await getUserId();

  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      timezone: true,
      language: true,
      dailyReflectionTime: true,
    },
  });

  if (!currentUser) {
    throw new Error("User not found");
  }

  const rawTimezone = formData.get("timezone")?.toString().trim() || "";
  const rawLanguage = formData.get("language")?.toString().trim() || "";
  const rawDailyReflectionTime =
    formData.get("dailyReflectionTime")?.toString().trim() || "";

  const marketingEmails = formData.get("marketingEmails") === "on";
  const dailyQuestionEmails = formData.get("dailyQuestionEmails") === "on";

  const timezone = rawTimezone || currentUser.timezone || "UTC";
  const language = rawLanguage || currentUser.language || "en";

  const dailyReflectionTime =
    dailyQuestionEmails && isValidHourTime(rawDailyReflectionTime)
      ? rawDailyReflectionTime
      : "00:00";

  console.log("PREFERENCES FORM DATA:", Object.fromEntries(formData.entries()));

  await prisma.user.update({
    where: { id: userId },
    data: {
      timezone,
      language,
      marketingEmails,
      dailyQuestionEmails,
      dailyReflectionTime,
    },
  });

  revalidatePath("/profile");
}*/

"use server";

import { refresh } from "next/cache";
import { auth } from "../../../auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

function isValidCountryCode(value: string | null | undefined) {
  return !!value && /^[A-Z]{2}$/.test(value);
}

function isValidHourTime(value: string | null | undefined) {
  return !!value && /^([01]\d|2[0-3]):00$/.test(value);
}

async function getUserId() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return Number(session.user.id);
}

export async function updateProfileBasics(formData: FormData) {
  const userId = await getUserId();

  const rawName = formData.get("name")?.toString().trim() || "";
  const rawCity = formData.get("city")?.toString().trim() || "";
  const rawCountryCode = formData.get("countryCode")?.toString().trim() || "";

  const name = rawName || null;
  const city = rawCity || null;
  const countryCode = isValidCountryCode(rawCountryCode)
    ? rawCountryCode.toUpperCase()
    : null;

  await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      city,
      countryCode,
    },
  });

  redirect("/profile");
}

export async function updatePreferences(formData: FormData) {
  const userId = await getUserId();

  const rawTimezone = formData.get("timezone")?.toString().trim() || "UTC";
  const rawLanguage = formData.get("language")?.toString().trim() || "en";
  const rawDailyReflectionTime =
    formData.get("dailyReflectionTime")?.toString().trim() || "";

  const marketingEmails = formData.get("marketingEmails") === "on";
  const dailyQuestionEmails = formData.get("dailyQuestionEmails") === "on";

  const dailyReflectionTime =
    dailyQuestionEmails && isValidHourTime(rawDailyReflectionTime)
      ? rawDailyReflectionTime
      : "00:00";

  await prisma.user.update({
    where: { id: userId },
    data: {
      timezone: rawTimezone,
      language: rawLanguage,
      marketingEmails,
      dailyQuestionEmails,
      dailyReflectionTime,
    },
  });

  redirect("/profile");
}