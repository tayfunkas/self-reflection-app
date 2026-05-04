import Link from "next/link";
import { SignupForm } from "./signup-form";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";

export default async function SignupPage() {
  const session = await auth();

  if (session?.user?.id) {
    redirect("/today");
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-md items-center px-6 py-16">
      <section className="w-full rounded-3xl border border-[#E8DDD3] bg-[#FFF9F5] p-8 shadow-sm">
        <p className="mb-3 text-sm uppercase tracking-[0.18em] text-[#7A6E63]">
          Self Reflection
        </p>

        <h1 className="mb-3 text-3xl font-semibold text-[#3B342E]">
          Create your account
        </h1>

        <p className="mb-8 text-sm leading-6 text-[#6F6257]">
          Start with a simple account. You’ll verify your email before logging in.
        </p>

        <SignupForm />

        <p className="mt-6 text-sm text-[#6F6257]">
          Already have an account?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Log in
          </Link>
        </p>
      </section>
    </main>
  );
}