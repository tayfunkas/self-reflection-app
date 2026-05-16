/*import Link from "next/link";
import { auth } from "../../../auth";
import { logout } from "../auth-actions";

export default async function TopNav() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.id;

  return (
    <header className="px-6 py-5">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <nav className="flex items-center gap-5">
          <Link
            href="/about"
            className="text-sm text-[#8A6F5A] transition hover:text-[#5F4636]"
          >
            About
          </Link>

          <Link
            href="/plus"
            className="text-sm text-[#8A6F5A] transition hover:text-[#5F4636]"
          >
            WithinYou Plus
          </Link>
        </nav>

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
}*/

import Link from "next/link";
import { auth } from "../../../auth";
import { logout } from "../auth-actions";
import prisma from "@/lib/prisma";

export default async function TopNav() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.id;

  let hasUnreadInsight = false;

  if (isLoggedIn) {
    const userId = Number(session.user.id);

    if (Number.isInteger(userId) && userId > 0) {
      const firstInsight = await prisma.reflectionInsight.findUnique({
        where: {
          userId_type: {
            userId,
            type: "first_five",
          },
        },
        select: {
          id: true,
          viewedAt: true,
        },
      });

      hasUnreadInsight = !!firstInsight && !firstInsight.viewedAt;
    }
  }

  return (
    <header className="px-6 py-5">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <nav className="flex items-center gap-5">
          <Link
            href="/about"
            className="text-sm text-[#8A6F5A] transition hover:text-[#5F4636]"
          >
            About
          </Link>

          <Link
            href="/plus"
            className="text-sm text-[#8A6F5A] transition hover:text-[#5F4636]"
          >
            WithinYou Plus
          </Link>
        </nav>

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
                className="relative rounded-full px-3 py-1 text-sm text-[#8A6F5A] transition hover:bg-[#F1E5D8] hover:text-[#5F4636]"
              >
                Profile

                {hasUnreadInsight && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D88B6A] px-1 text-[10px] font-medium leading-none text-white">
                    1
                  </span>
                )}
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