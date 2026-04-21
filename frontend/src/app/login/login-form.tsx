/*"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

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
          autoComplete="current-password"
          required
          className="w-full rounded-2xl border border-[#E3D7CD] bg-white px-4 py-3 text-sm text-[#3B342E] outline-none transition placeholder:text-[#9A8F85] focus:border-[#C9825B]"
          placeholder="Your password"
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
        {pending ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
}*/

/*"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setPending(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/today",
    });

    setPending(false);

    if (!result) {
      setError("Something went wrong. Please try again.");
      return;
    }

    if (result.error) {
      setError("Invalid email or password.");
      return;
    }

    window.location.href = result.url ?? "/today";
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-5"
    >
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
          autoComplete="current-password"
          required
          className="w-full rounded-2xl border border-[#E3D7CD] bg-white px-4 py-3 text-sm text-[#3B342E] outline-none transition placeholder:text-[#9A8F85] focus:border-[#C9825B]"
          placeholder="Your password"
        />
      </div>

      {error ? (
        <p className="rounded-2xl border border-[#E7C9BA] bg-[#FDF1EB] px-4 py-3 text-sm text-[#8A4B2F]">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-[#C9825B] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#B87450] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
}*/

/*"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setPending(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        redirectTo: "/today",
      });

      if (!result) {
        setError("Something went wrong. Please try again.");
        return;
      }

      if (result.error) {
        setError("Invalid email or password.");
        return;
      }

      window.location.href = result.url || "/today";
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
          autoComplete="current-password"
          required
          className="w-full rounded-2xl border border-[#E3D7CD] bg-white px-4 py-3 text-sm text-[#3B342E] outline-none transition placeholder:text-[#9A8F85] focus:border-[#C9825B]"
          placeholder="Your password"
        />
      </div>

      {error ? (
        <p className="rounded-2xl border border-[#E7C9BA] bg-[#FDF1EB] px-4 py-3 text-sm text-[#8A4B2F]">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-[#C9825B] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#B87450] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
}*/

/*"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

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
          autoComplete="current-password"
          required
          className="w-full rounded-2xl border border-[#E3D7CD] bg-white px-4 py-3 text-sm text-[#3B342E] outline-none transition placeholder:text-[#9A8F85] focus:border-[#C9825B]"
          placeholder="Your password"
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
        {pending ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
}*/

"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

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
          autoComplete="current-password"
          required
          className="w-full rounded-2xl border border-[#E3D7CD] bg-white px-4 py-3 text-sm text-[#3B342E] outline-none transition placeholder:text-[#9A8F85] focus:border-[#C9825B]"
          placeholder="Your password"
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
        {pending ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
}