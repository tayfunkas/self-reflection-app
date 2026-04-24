/*import Link from "next/link";
import { LoginForm } from "./login-form";

type LoginPageProps = {
  searchParams: Promise<{
    verified?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { verified } = await searchParams;

  return (
    <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-md items-center px-6 py-16">
      <section className="w-full rounded-3xl border border-[#E8DDD3] bg-[#FFF9F5] p-8 shadow-sm">
        <p className="mb-3 text-sm uppercase tracking-[0.18em] text-[#7A6E63]">
          Self Reflection
        </p>

        <h1 className="mb-3 text-3xl font-semibold text-[#3B342E]">
          Welcome back
        </h1>

        <p className="mb-8 text-sm leading-6 text-[#6F6257]">
          Log in to continue your daily reflection.
        </p>

        {verified === "1" ? (
          <p className="mb-5 rounded-2xl border border-[#D8E7D1] bg-[#F4FAF1] px-4 py-3 text-sm text-[#4E6B43]">
            Your email has been verified. You can now log in.
          </p>
        ) : null}

        <LoginForm />

        <p className="mt-6 text-sm text-[#6F6257]">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline underline-offset-4">
            Create account
          </Link>
        </p>
      </section>
    </main>
  );
}*/

/*import Link from "next/link";
import { LoginForm } from "./login-form";

type LoginPageProps = {
  searchParams: Promise<{
    verified?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { verified } = await searchParams;

  return (
    <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-md items-center px-6 py-16">
      <section className="w-full rounded-3xl border border-[#E8DDD3] bg-[#FFF9F5] p-8 shadow-sm">
        <p className="mb-3 text-sm uppercase tracking-[0.18em] text-[#7A6E63]">
          Self Reflection
        </p>

        <h1 className="mb-3 text-3xl font-semibold text-[#3B342E]">
          Welcome back
        </h1>

        <p className="mb-8 text-sm leading-6 text-[#6F6257]">
          Log in to continue your daily reflection.
        </p>

        {verified === "1" ? (
          <p className="mb-5 rounded-2xl border border-[#D8E7D1] bg-[#F4FAF1] px-4 py-3 text-sm text-[#4E6B43]">
            Your email has been verified. You can now log in.
          </p>
        ) : null}

        <LoginForm />

        <p className="mt-6 text-sm text-[#6F6257]">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline underline-offset-4">
            Create account
          </Link>
        </p>
      </section>
    </main>
  );
}*/

import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import { LoginForm } from "./login-form";

type LoginPageProps = {
  searchParams: Promise<{
    verified?: string;
    passwordReset?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth();

  if (session?.user?.id) {
    redirect("/today");
  }

  const { verified, passwordReset } = await searchParams;

  return (
    <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-md items-center px-6 py-16">
      <section className="w-full rounded-3xl border border-[#E8DDD3] bg-[#FFF9F5] p-8 shadow-sm">
        <p className="mb-3 text-sm uppercase tracking-[0.18em] text-[#7A6E63]">
          Self Reflection
        </p>

        <h1 className="mb-3 text-3xl font-semibold text-[#3B342E]">
          Welcome back
        </h1>

        <p className="mb-8 text-sm leading-6 text-[#6F6257]">
          Log in to continue your daily reflection.
        </p>

        {verified === "1" ? (
          <p className="mb-5 rounded-2xl border border-[#D8E7D1] bg-[#F4FAF1] px-4 py-3 text-sm text-[#4E6B43]">
            Your email has been verified. You can now log in.
          </p>
        ) : null}

        {passwordReset === "1" ? (
          <p className="mb-5 rounded-2xl border border-[#D8E7D1] bg-[#F4FAF1] px-4 py-3 text-sm text-[#4E6B43]">
            Your password has been updated. You can now log in.
          </p>
        ) : null}

        <LoginForm />

        <p className="mt-6 text-sm text-[#6F6257]">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline underline-offset-4">
            Create account
          </Link>
        </p>
        <p className="mt-4 text-sm text-[#6F6257]">
          <Link href="/forgot-password" className="underline underline-offset-4">
            Forgot your password?
          </Link>
        </p>
      </section>
    </main>
  );
}