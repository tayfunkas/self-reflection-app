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
          WithinYou
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