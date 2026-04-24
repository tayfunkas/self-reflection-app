import Link from "next/link";
import { requestPasswordReset } from "./actions";

type ForgotPasswordPageProps = {
  searchParams: Promise<{
    sent?: string;
  }>;
};

export default async function ForgotPasswordPage({
  searchParams,
}: ForgotPasswordPageProps) {
  const { sent } = await searchParams;

  return (
    <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-md items-center px-6 py-16">
      <section className="w-full rounded-3xl border border-[#E8DDD3] bg-[#FFF9F5] p-8 shadow-sm">
        <p className="mb-3 text-sm uppercase tracking-[0.18em] text-[#7A6E63]">
          Self Reflection
        </p>

        <h1 className="mb-3 text-3xl font-semibold text-[#3B342E]">
          Reset your password
        </h1>

        <p className="mb-8 text-sm leading-6 text-[#6F6257]">
          Enter your email address and we will send you a password reset link.
        </p>

        {sent === "1" ? (
          <p className="mb-5 rounded-2xl border border-[#D8E7D1] bg-[#F4FAF1] px-4 py-3 text-sm text-[#4E6B43]">
            If an account exists with that email, a reset link has been sent.
          </p>
        ) : null}

        <form action={requestPasswordReset} className="space-y-4">
          <div>
            <label className="text-sm text-[#6F6257]">Email</label>
            <input
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-xl border border-[#E8D9CC] bg-[#FFFDFC] px-4 py-3 text-[#705847] outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-[#6A4F3D] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            Send reset link
          </button>
        </form>

        <p className="mt-6 text-sm text-[#6F6257]">
          Remember your password?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Log in
          </Link>
        </p>
      </section>
    </main>
  );
}