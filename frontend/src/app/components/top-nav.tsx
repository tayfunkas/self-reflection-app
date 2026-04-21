/*import Link from "next/link";

export default function TopNav() {
  return (
    <header className="w-full border-b border-[#E7D8C8] bg-[#F8F2EA]/95">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <nav>
          <Link
            href="/about"
            className="text-sm text-[#7A6E63] transition hover:text-[#3B342E]"
          >
            About
          </Link>
        </nav>

        <Link
          href="/"
          className="text-base font-medium tracking-[0.08em] text-[#3B342E]"
        >
          Self Reflection
        </Link>

        <nav>
          <Link
            href="/profile"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DCC9B6] text-sm text-[#7A6E63] transition hover:border-[#C9825B] hover:text-[#3B342E]"
            aria-label="Profile"
          >
            ☺
          </Link>
        </nav>
      </div>
    </header>
  );
}*/

/*import Link from "next/link";

export default function TopNav() {
  return (
    <header className="px-6 py-5">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link
          href="/about"
          className="text-sm text-[#8A6F5A] transition hover:text-[#5F4636]"
        >
          About
        </Link>

        <Link
          href="/"
          className="text-base font-medium tracking-[0.04em] text-[#7A5C49]"
        >
          Self Reflection
        </Link>

        <Link
          href="/profile"
          className="rounded-full px-3 py-1 text-sm text-[#8A6F5A] transition hover:bg-[#F1E5D8] hover:text-[#5F4636]"
        >
          Profile
        </Link>
      </div>
    </header>
  );
}*/

import Link from "next/link";
import { auth } from "../../../auth";
import { logout } from "../auth-actions";

export default async function TopNav() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.id;

  return (
    <header className="px-6 py-5">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link
          href="/about"
          className="text-sm text-[#8A6F5A] transition hover:text-[#5F4636]"
        >
          About
        </Link>

        <Link
          href={isLoggedIn ? "/today" : "/"}
          className="text-base font-medium tracking-[0.04em] text-[#7A5C49]"
        >
          Self Reflection
        </Link>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className="rounded-full px-3 py-1 text-sm text-[#8A6F5A] transition hover:bg-[#F1E5D8] hover:text-[#5F4636]"
              >
                Profile
              </Link>

              <form action={logout}>
                <button
                  type="submit"
                  className="rounded-full px-3 py-1 text-sm text-[#8A6F5A] transition hover:bg-[#F1E5D8] hover:text-[#5F4636]"
                >
                  Log out
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full px-3 py-1 text-sm text-[#8A6F5A] transition hover:bg-[#F1E5D8] hover:text-[#5F4636]"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}