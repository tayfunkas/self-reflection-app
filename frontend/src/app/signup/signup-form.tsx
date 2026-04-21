"use client";

import { useActionState } from "react";
import { signup } from "./actions";

type SignupState = {
  error?: string;
};

const initialState: SignupState = {};

export function SignupForm() {
  const [state, formAction, pending] = useActionState(signup, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-[#4B4138]"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full rounded-2xl border border-[#E3D7CD] bg-white px-4 py-3 text-sm text-[#3B342E] outline-none transition placeholder:text-[#9A8F85] focus:border-[#C9825B]"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-[#4B4138]"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className="w-full rounded-2xl border border-[#E3D7CD] bg-white px-4 py-3 text-sm text-[#3B342E] outline-none transition placeholder:text-[#9A8F85] focus:border-[#C9825B]"
          placeholder="At least 8 characters"
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-sm font-medium text-[#4B4138]"
        >
          Confirm password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className="w-full rounded-2xl border border-[#E3D7CD] bg-white px-4 py-3 text-sm text-[#3B342E] outline-none transition placeholder:text-[#9A8F85] focus:border-[#C9825B]"
          placeholder="Repeat your password"
        />
      </div>

      {state?.error ? (
        <p className="rounded-2xl border border-[#E7C9BA] bg-[#FDF1EB] px-4 py-3 text-sm text-[#8A4B2F]">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-[#C9825B] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#B87450] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}