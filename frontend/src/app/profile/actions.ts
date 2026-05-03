/*"use server";

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
}*/

"use server";

import { auth } from "../../../auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const MAX_NAME_LENGTH = 80;
const MAX_CITY_LENGTH = 80;

const ALLOWED_COUNTRY_CODES = ["DE", "TR", "EE", "GB", "US"];
const ALLOWED_LANGUAGES = ["en"];

function cleanText(value: FormDataEntryValue | null, maxLength: number) {
  if (typeof value !== "string") return null;

  const cleaned = value.trim();

  if (!cleaned) return null;

  if (cleaned.length > maxLength) {
    throw new Error("Input is too long");
  }

  return cleaned;
}

function isValidCountryCode(value: string | null | undefined) {
  return !!value && ALLOWED_COUNTRY_CODES.includes(value.toUpperCase());
}

function isValidHourTime(value: string | null | undefined) {
  return !!value && /^([01]\d|2[0-3]):00$/.test(value);
}

function isValidTimezone(value: string | null | undefined) {
  if (!value) return false;

  try {
    Intl.DateTimeFormat(undefined, { timeZone: value });
    return true;
  } catch {
    return false;
  }
}

function isValidLanguage(value: string | null | undefined) {
  return !!value && ALLOWED_LANGUAGES.includes(value);
}

async function getUserId() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = Number(session.user.id);

  if (!Number.isInteger(userId) || userId <= 0) {
    redirect("/login");
  }

  return userId;
}

export async function updateProfileBasics(formData: FormData) {
  const userId = await getUserId();

  const name = cleanText(formData.get("name"), MAX_NAME_LENGTH);
  const city = cleanText(formData.get("city"), MAX_CITY_LENGTH);

  const rawCountryCode =
    formData.get("countryCode")?.toString().trim().toUpperCase() || "";

  const countryCode = isValidCountryCode(rawCountryCode)
    ? rawCountryCode
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

  const timezone = isValidTimezone(rawTimezone) ? rawTimezone : "UTC";
  const language = isValidLanguage(rawLanguage) ? rawLanguage : "en";

  const marketingEmails = formData.get("marketingEmails") === "on";
  const dailyQuestionEmails = formData.get("dailyQuestionEmails") === "on";

  const dailyReflectionTime =
    dailyQuestionEmails && isValidHourTime(rawDailyReflectionTime)
      ? rawDailyReflectionTime
      : "00:00";

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

  redirect("/profile");
}