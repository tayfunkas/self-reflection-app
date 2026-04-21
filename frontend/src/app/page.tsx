/*import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-3xl items-center justify-center px-6">
      <section className="w-full text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.18em] text-[#7A6E63]">
          Self Reflection
        </p>

        <h1 className="mx-auto mb-6 max-w-2xl text-4xl font-semibold leading-tight md:text-5xl">
          A Daily Question for Quiet Self-Reflection
        </h1>

        <p className="mx-auto mb-10 max-w-xl text-base leading-7 text-[#6F6257] md:text-lg">
          A quiet place to pause, notice what is happening within you, and
          respond honestly in your own words.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/login"
            className="rounded-full bg-[#C9825B] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#B87450]"
          >
            Log In
          </Link>

          <Link
    href="/signup"
    className="rounded-full border border-[#D8C8BC] bg-white px-6 py-3 text-sm font-medium text-[#5E5147] transition hover:border-[#CBB9AC] hover:bg-[#FCF7F3]"
  >
    Create account
  </Link>

        </div>
      </section>
    </main>
  );
}*/

/*import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../auth";

export default async function HomePage() {
  const session = await auth();

  if (session?.user?.id) {
    redirect("/today");
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-3xl items-center justify-center px-6">
      <section className="w-full text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.18em] text-[#7A6E63]">
          Self Reflection
        </p>

        <h1 className="mx-auto mb-6 max-w-2xl text-4xl font-semibold leading-tight md:text-5xl">
          A Daily Question for Quiet Self-Reflection
        </h1>

        <p className="mx-auto mb-10 max-w-xl text-base leading-7 text-[#6F6257] md:text-lg">
          A quiet place to pause, notice what is happening within you, and
          respond honestly in your own words.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/login"
            className="rounded-full bg-[#C9825B] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#B87450]"
          >
            Log In
          </Link>

          <Link
            href="/signup"
            className="rounded-full border border-[#D8C8BC] bg-white px-6 py-3 text-sm font-medium text-[#5E5147] transition hover:border-[#CBB9AC] hover:bg-[#FCF7F3]"
          >
            Create account
          </Link>
        </div>
      </section>
    </main>
  );
}*/

import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../auth";

export default async function HomePage() {
  const session = await auth();

  if (session?.user?.id) {
    redirect("/today");
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-3xl items-center justify-center px-6">
      <section className="w-full text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.18em] text-[#7A6E63]">
          Self Reflection
        </p>

        <h1 className="mx-auto mb-6 max-w-2xl text-4xl font-semibold leading-tight md:text-5xl">
          A Daily Question for Quiet Self-Reflection
        </h1>

        <p className="mx-auto mb-10 max-w-xl text-base leading-7 text-[#6F6257] md:text-lg">
          A quiet place to pause, notice what is happening within you, and
          respond honestly in your own words.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/login"
            className="rounded-full bg-[#C9825B] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#B87450]"
          >
            Log In
          </Link>

          <Link
            href="/signup"
            className="rounded-full border border-[#D8C8BC] bg-white px-6 py-3 text-sm font-medium text-[#5E5147] transition hover:border-[#CBB9AC] hover:bg-[#FCF7F3]"
          >
            Create account
          </Link>
        </div>
      </section>
    </main>
  );
}