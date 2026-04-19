import Link from "next/link";

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
            href="/today"
            className="rounded-full bg-[#C9825B] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#B87450]"
          >
            Log In
          </Link>

          <Link
            href="/about"
            className="text-sm text-[#7A6E63] underline-offset-4 transition hover:text-[#3B342E] hover:underline"
          >
            Learn more
          </Link>
        </div>
      </section>
    </main>
  );
}

/*import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-76px)] max-w-4xl items-center px-6">
      <section className="max-w-2xl">
        <p className="mb-4 text-sm tracking-[0.12em] text-[#9A7D68] uppercase">
          Welcome
        </p>

        <h1 className="mb-6 text-5xl leading-tight font-medium text-[#6A4F3D]">
          A Daily Question for Quiet Self-Reflection
        </h1>

        <p className="mb-10 max-w-xl text-lg leading-8 text-[#866B58]">
          A soft place to pause, notice your inner world, and respond with
          honesty, gently and without pressure.
        </p>

        <div className="flex items-center gap-5">
          <Link
            href="/today"
            className="rounded-full bg-[#D88B6A] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#C97857]"
          >
            Log In
          </Link>

          <Link
            href="/about"
            className="text-sm text-[#8A6F5A] transition hover:text-[#5F4636]"
          >
            Learn more
          </Link>
        </div>
      </section>
    </main>
  );
}*/