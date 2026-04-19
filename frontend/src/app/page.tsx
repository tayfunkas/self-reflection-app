import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Self Reflection App</h1>
      <p className="mb-6">Welcome.</p>

      <nav className="space-y-3">
        <div>
          <Link href="/today" className="underline">
            Go to today&apos;s question
          </Link>
        </div>
        <div>
          <Link href="/history" className="underline">
            View history
          </Link>
        </div>
        <div>
          <Link href="/profile" className="underline">
            Profile
          </Link>
        </div>
      </nav>
    </main>
  );
}