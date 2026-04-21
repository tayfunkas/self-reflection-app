/*"use client";

import { useEffect, useState } from "react";
import { updateProfile } from "./actions";

const COUNTRIES = [
  { code: "DE", name: "Germany" },
  { code: "TR", name: "Türkiye" },
  { code: "EE", name: "Estonia" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
];

const TIME_OPTIONS = Array.from({ length: 24 }, (_, hour) => {
  const value = `${String(hour).padStart(2, "0")}:00`;

  let label = "";
  if (hour === 0) label = "12:00 AM";
  else if (hour < 12) label = `${hour}:00 AM`;
  else if (hour === 12) label = "12:00 PM";
  else label = `${hour - 12}:00 PM`;

  return { value, label };
});

type ProfileFormProps = {
  email: string;
  name: string | null;
  city: string | null;
  countryCode: string | null;
  timezone: string;
  language: string;
  marketingEmails: boolean;
  dailyQuestionEmails: boolean;
  dailyReflectionTime: string;
};

export default function ProfileForm({
  email,
  name,
  city,
  countryCode,
  timezone,
  language,
  marketingEmails,
  dailyQuestionEmails,
  dailyReflectionTime,
}: ProfileFormProps) {
  const [detectedTimezone, setDetectedTimezone] = useState(timezone || "UTC");
  const [dailyEmailsEnabled, setDailyEmailsEnabled] =
    useState(dailyQuestionEmails);

  useEffect(() => {
    const browserTimezone =
      Intl.DateTimeFormat().resolvedOptions().timeZone || timezone || "UTC";
    setDetectedTimezone(browserTimezone);
  }, [timezone]);

  return (
    <form action={updateProfile} className="space-y-6">
      <input type="hidden" name="timezone" value={detectedTimezone} />

      <section className="rounded-[28px] bg-[#FBF6F0] px-7 py-8 md:px-10 md:py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-medium text-[#6A4F3D]">Account</h2>
            <p className="mt-2 text-sm leading-6 text-[#8A6F5C]">
              Email is required. Other profile details are optional.
            </p>
          </div>
          <span className="rounded-full bg-[#F2E7DA] px-4 py-2 text-xs uppercase tracking-[0.08em] text-[#8B6B57]">
            Basic info
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Email">
            <input
              value={email}
              disabled
              className="mt-2 w-full rounded-xl border border-[#E8D9CC] bg-[#F7F1EA] px-4 py-3 text-[#8A6F5C] outline-none"
            />
          </Field>

          <Field label="Name">
            <input
              name="name"
              defaultValue={name ?? ""}
              placeholder="Add your name"
              className="mt-2 w-full rounded-xl border border-[#E8D9CC] bg-[#FFFDFC] px-4 py-3 text-[#705847] outline-none"
            />
          </Field>

          <Field label="Country">
            <select
              name="countryCode"
              defaultValue={countryCode ?? ""}
              className="mt-2 w-full rounded-xl border border-[#E8D9CC] bg-[#FFFDFC] px-4 py-3 text-[#705847] outline-none"
            >
              <option value="">Select a country</option>
              {COUNTRIES.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="City">
            <input
              name="city"
              defaultValue={city ?? ""}
              placeholder="Add your city"
              className="mt-2 w-full rounded-xl border border-[#E8D9CC] bg-[#FFFDFC] px-4 py-3 text-[#705847] outline-none"
            />
          </Field>
        </div>
      </section>

      <section className="rounded-[28px] bg-[#FBF6F0] px-7 py-8 md:px-8 md:py-9">
        <div className="mb-6">
          <h2 className="text-2xl font-medium text-[#6A4F3D]">Preferences</h2>
          <p className="mt-2 text-sm leading-6 text-[#8A6F5C]">
            Choose how and when you receive your reflections.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ToggleField
            label="Daily question emails"
            name="dailyQuestionEmails"
            defaultChecked={dailyQuestionEmails}
            onChange={(checked) => setDailyEmailsEnabled(checked)}
          />

          <Field label="Preferred delivery time">
            <select
              name="dailyReflectionTime"
              defaultValue={dailyReflectionTime || "00:00"}
              disabled={!dailyEmailsEnabled}
              className="mt-2 w-full rounded-xl border border-[#E8D9CC] bg-[#FFFDFC] px-4 py-3 text-[#705847] outline-none disabled:bg-[#F7F1EA] disabled:text-[#A08A79]"
            >
              {TIME_OPTIONS.map((time) => (
                <option key={time.value} value={time.value}>
                  {time.label}
                </option>
              ))}
            </select>
          </Field>

          <ToggleField
            label="Marketing emails"
            name="marketingEmails"
            defaultChecked={marketingEmails}
          />

          <Field label="Language">
            <select
              name="language"
              defaultValue={language || "en"}
              className="mt-2 w-full rounded-xl border border-[#E8D9CC] bg-[#FFFDFC] px-4 py-3 text-[#705847] outline-none"
            >
              <option value="en">English</option>
            </select>
          </Field>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-[#E8D9CC] bg-[#FFFDFC] px-5 py-4">
          <div>
            <p className="text-sm text-[#9A7D68]">Detected timezone</p>
            <p className="mt-2 text-[16px] leading-7 text-[#705847]">
              {detectedTimezone}
            </p>
          </div>

          <button
            type="submit"
            className="rounded-full bg-[#6A4F3D] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            Save changes
          </button>
        </div>
      </section>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#E8D9CC] bg-[#FFFDFC] px-5 py-4">
      <p className="text-sm text-[#9A7D68]">{label}</p>
      {children}
    </div>
  );
}

function ToggleField({
  label,
  name,
  defaultChecked,
  onChange,
}: {
  label: string;
  name: string;
  defaultChecked: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#E8D9CC] bg-[#FFFDFC] px-5 py-4">
      <div>
        <p className="text-sm text-[#9A7D68]">{label}</p>
      </div>

      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="h-5 w-5 accent-[#6A4F3D]"
      />
    </label>
  );
}*/

/*"use client";

import { useEffect, useState } from "react";
import { updateProfileBasics, updatePreferences } from "./actions";

const COUNTRIES = [
  { code: "DE", name: "Germany" },
  { code: "TR", name: "Türkiye" },
  { code: "EE", name: "Estonia" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
];

const TIME_OPTIONS = Array.from({ length: 24 }, (_, hour) => {
  const value = `${String(hour).padStart(2, "0")}:00`;

  let label = "";
  if (hour === 0) label = "12:00 AM";
  else if (hour < 12) label = `${hour}:00 AM`;
  else if (hour === 12) label = "12:00 PM";
  else label = `${hour - 12}:00 PM`;

  return { value, label };
});

type ProfileFormProps = {
  email: string;
  name: string | null;
  city: string | null;
  countryCode: string | null;
  timezone: string;
  language: string;
  marketingEmails: boolean;
  dailyQuestionEmails: boolean;
  dailyReflectionTime: string;
};

export default function ProfileForm({
  email,
  name,
  city,
  countryCode,
  timezone,
  language,
  marketingEmails,
  dailyQuestionEmails,
  dailyReflectionTime,
}: ProfileFormProps) {
  const [detectedTimezone, setDetectedTimezone] = useState(timezone || "UTC");
  const [dailyEmailsEnabled, setDailyEmailsEnabled] =
    useState(dailyQuestionEmails);

  useEffect(() => {
    const browserTimezone =
      Intl.DateTimeFormat().resolvedOptions().timeZone || timezone || "UTC";
    setDetectedTimezone(browserTimezone);
  }, [timezone]);

  return (
    <div className="space-y-6">
      <form action={updateProfileBasics}>
        <section className="rounded-[28px] bg-[#FBF6F0] px-7 py-8 md:px-10 md:py-10">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-medium text-[#6A4F3D]">Account</h2>
              <p className="mt-2 text-sm leading-6 text-[#8A6F5C]">
                Email is required. Other profile details are optional.
              </p>
            </div>
            <span className="rounded-full bg-[#F2E7DA] px-4 py-2 text-xs uppercase tracking-[0.08em] text-[#8B6B57]">
              Basic info
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Email">
              <input
                value={email}
                disabled
                readOnly
                className="mt-2 w-full rounded-xl border border-[#E8D9CC] bg-[#F7F1EA] px-4 py-3 text-[#8A6F5C] outline-none"
              />
            </Field>

            <Field label="Name">
              <input
                name="name"
                defaultValue={name ?? ""}
                placeholder="Add your name"
                className="mt-2 w-full rounded-xl border border-[#E8D9CC] bg-[#FFFDFC] px-4 py-3 text-[#705847] outline-none"
              />
            </Field>

            <Field label="Country">
              <select
                name="countryCode"
                defaultValue={countryCode ?? ""}
                className="mt-2 w-full rounded-xl border border-[#E8D9CC] bg-[#FFFDFC] px-4 py-3 text-[#705847] outline-none"
              >
                <option value="">Select a country</option>
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="City">
              <input
                name="city"
                defaultValue={city ?? ""}
                placeholder="Add your city"
                className="mt-2 w-full rounded-xl border border-[#E8D9CC] bg-[#FFFDFC] px-4 py-3 text-[#705847] outline-none"
              />
            </Field>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-[#6A4F3D] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Save profile
            </button>
          </div>
        </section>
      </form>

      <form action={updatePreferences}>
        <input type="hidden" name="timezone" value={detectedTimezone} />

        <section className="rounded-[28px] bg-[#FBF6F0] px-7 py-8 md:px-8 md:py-9">
          <div className="mb-6">
            <h2 className="text-2xl font-medium text-[#6A4F3D]">
              Preferences
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#8A6F5C]">
              Choose how and when you receive your reflections.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <ToggleField
              label="Daily question emails"
              name="dailyQuestionEmails"
              defaultChecked={dailyQuestionEmails}
              onChange={(checked) => setDailyEmailsEnabled(checked)}
            />

            <Field label="Preferred delivery time">
              <select
                name="dailyReflectionTime"
                defaultValue={dailyReflectionTime || "00:00"}
                disabled={!dailyEmailsEnabled}
                className="mt-2 w-full rounded-xl border border-[#E8D9CC] bg-[#FFFDFC] px-4 py-3 text-[#705847] outline-none disabled:bg-[#F7F1EA] disabled:text-[#A08A79]"
              >
                {TIME_OPTIONS.map((time) => (
                  <option key={time.value} value={time.value}>
                    {time.label}
                  </option>
                ))}
              </select>
            </Field>

            <ToggleField
              label="Marketing emails"
              name="marketingEmails"
              defaultChecked={marketingEmails}
              helperText="Rare updates only"
            />

            <Field label="Language">
              <select
                name="language"
                defaultValue={language || "en"}
                className="mt-2 w-full rounded-xl border border-[#E8D9CC] bg-[#FFFDFC] px-4 py-3 text-[#705847] outline-none"
              >
                <option value="en">English</option>
              </select>
            </Field>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-[#E8D9CC] bg-[#FFFDFC] px-5 py-4">
            <div>
              <p className="text-sm text-[#9A7D68]">Detected timezone</p>
              <p className="mt-2 text-[16px] leading-7 text-[#705847]">
                {detectedTimezone}
              </p>
            </div>

            <button
              type="submit"
              className="rounded-full bg-[#6A4F3D] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Save preferences
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#E8D9CC] bg-[#FFFDFC] px-5 py-4">
      <p className="text-sm text-[#9A7D68]">{label}</p>
      {children}
    </div>
  );
}

function ToggleField({
  label,
  name,
  defaultChecked,
  onChange,
  helperText,
}: {
  label: string;
  name: string;
  defaultChecked: boolean;
  onChange?: (checked: boolean) => void;
  helperText?: string;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#E8D9CC] bg-[#FFFDFC] px-5 py-4">
      <div>
        <p className="text-sm text-[#9A7D68]">{label}</p>
        {helperText ? (
          <p className="mt-1 text-xs text-[#A08A79]">{helperText}</p>
        ) : null}
      </div>

      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="h-5 w-5 accent-[#6A4F3D]"
      />
    </label>
  );
}*/

"use client";

import { useEffect, useState, type ReactNode } from "react";
import { updateProfileBasics, updatePreferences } from "./actions";

const COUNTRIES = [
  { code: "DE", name: "Germany" },
  { code: "TR", name: "Türkiye" },
  { code: "EE", name: "Estonia" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
];

const TIME_OPTIONS = Array.from({ length: 24 }, (_, hour) => {
  const value = `${String(hour).padStart(2, "0")}:00`;

  let label = "";
  if (hour === 0) label = "12:00 AM";
  else if (hour < 12) label = `${hour}:00 AM`;
  else if (hour === 12) label = "12:00 PM";
  else label = `${hour - 12}:00 PM`;

  return { value, label };
});

type ProfileFormProps = {
  email: string;
  name: string | null;
  city: string | null;
  countryCode: string | null;
  timezone: string;
  language: string;
  marketingEmails: boolean;
  dailyQuestionEmails: boolean;
  dailyReflectionTime: string;
};

export default function ProfileForm({
  email,
  name,
  city,
  countryCode,
  timezone,
  language,
  marketingEmails,
  dailyQuestionEmails,
  dailyReflectionTime,
}: ProfileFormProps) {
  const [detectedTimezone, setDetectedTimezone] = useState(timezone || "UTC");
  const [dailyEmailsEnabled, setDailyEmailsEnabled] =
    useState(dailyQuestionEmails);

  const [selectedCountryCode, setSelectedCountryCode] = useState(
    countryCode ?? ""
  );
  const [selectedTime, setSelectedTime] = useState(
    dailyReflectionTime || "00:00"
  );

  useEffect(() => {
    const browserTimezone =
      Intl.DateTimeFormat().resolvedOptions().timeZone || timezone || "UTC";
    setDetectedTimezone(browserTimezone);
  }, [timezone]);

  useEffect(() => {
    setSelectedCountryCode(countryCode ?? "");
  }, [countryCode]);

  useEffect(() => {
    setSelectedTime(dailyReflectionTime || "00:00");
  }, [dailyReflectionTime]);

  useEffect(() => {
    setDailyEmailsEnabled(dailyQuestionEmails);
  }, [dailyQuestionEmails]);

  return (
    <div className="space-y-6">
      <form action={updateProfileBasics}>
        <section className="rounded-[28px] bg-[#FBF6F0] px-7 py-8 md:px-10 md:py-10">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-medium text-[#6A4F3D]">Account</h2>
              <p className="mt-2 text-sm leading-6 text-[#8A6F5C]">
                Email is required. Other profile details are optional.
              </p>
            </div>
            <span className="rounded-full bg-[#F2E7DA] px-4 py-2 text-xs uppercase tracking-[0.08em] text-[#8B6B57]">
              Basic info
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Email">
              <input
                value={email}
                disabled
                readOnly
                className="mt-2 w-full rounded-xl border border-[#E8D9CC] bg-[#F7F1EA] px-4 py-3 text-[#8A6F5C] outline-none"
              />
            </Field>

            <Field label="Name">
              <input
                name="name"
                defaultValue={name ?? ""}
                placeholder="Add your name"
                className="mt-2 w-full rounded-xl border border-[#E8D9CC] bg-[#FFFDFC] px-4 py-3 text-[#705847] outline-none"
              />
            </Field>

            <Field label="Country">
              <select
                name="countryCode"
                value={selectedCountryCode}
                onChange={(e) => setSelectedCountryCode(e.target.value)}
                className="mt-2 w-full rounded-xl border border-[#E8D9CC] bg-[#FFFDFC] px-4 py-3 text-[#705847] outline-none"
              >
                <option value="">Select a country</option>
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="City">
              <input
                name="city"
                defaultValue={city ?? ""}
                placeholder="Add your city"
                className="mt-2 w-full rounded-xl border border-[#E8D9CC] bg-[#FFFDFC] px-4 py-3 text-[#705847] outline-none"
              />
            </Field>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-[#6A4F3D] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Save profile
            </button>
          </div>
        </section>
      </form>

      <form action={updatePreferences}>
        <input type="hidden" name="timezone" value={detectedTimezone} />

        <section className="rounded-[28px] bg-[#FBF6F0] px-7 py-8 md:px-8 md:py-9">
          <div className="mb-6">
            <h2 className="text-2xl font-medium text-[#6A4F3D]">
              Preferences
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#8A6F5C]">
              Choose how and when you receive your reflections.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <ToggleField
              label="Daily question emails"
              name="dailyQuestionEmails"
              defaultChecked={dailyQuestionEmails}
              onChange={(checked) => setDailyEmailsEnabled(checked)}
            />

            <Field label="Preferred delivery time">
              <select
                name="dailyReflectionTime"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                disabled={!dailyEmailsEnabled}
                className="mt-2 w-full rounded-xl border border-[#E8D9CC] bg-[#FFFDFC] px-4 py-3 text-[#705847] outline-none disabled:bg-[#F7F1EA] disabled:text-[#A08A79]"
              >
                {TIME_OPTIONS.map((time) => (
                  <option key={time.value} value={time.value}>
                    {time.label}
                  </option>
                ))}
              </select>
            </Field>

            <ToggleField
              label="Marketing emails"
              name="marketingEmails"
              defaultChecked={marketingEmails}
              helperText="Rare updates only"
            />

            <Field label="Language">
              <select
                name="language"
                defaultValue={language || "en"}
                className="mt-2 w-full rounded-xl border border-[#E8D9CC] bg-[#FFFDFC] px-4 py-3 text-[#705847] outline-none"
              >
                <option value="en">English</option>
              </select>
            </Field>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-[#E8D9CC] bg-[#FFFDFC] px-5 py-4">
            <div>
              <p className="text-sm text-[#9A7D68]">Detected timezone</p>
              <p className="mt-2 text-[16px] leading-7 text-[#705847]">
                {detectedTimezone}
              </p>
            </div>

            <button
              type="submit"
              className="rounded-full bg-[#6A4F3D] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Save preferences
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#E8D9CC] bg-[#FFFDFC] px-5 py-4">
      <p className="text-sm text-[#9A7D68]">{label}</p>
      {children}
    </div>
  );
}

function ToggleField({
  label,
  name,
  defaultChecked,
  onChange,
  helperText,
}: {
  label: string;
  name: string;
  defaultChecked: boolean;
  onChange?: (checked: boolean) => void;
  helperText?: string;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#E8D9CC] bg-[#FFFDFC] px-5 py-4">
      <div>
        <p className="text-sm text-[#9A7D68]">{label}</p>
        {helperText ? (
          <p className="mt-1 text-xs text-[#A08A79]">{helperText}</p>
        ) : null}
      </div>

      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="h-5 w-5 accent-[#6A4F3D]"
      />
    </label>
  );
}