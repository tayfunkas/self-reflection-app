import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import prisma from "@/lib/prisma";
import ProfileForm from "./profile-form";
import DeleteAccountCard from "./delete-account-card";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function truncateText(text: string, maxLength = 220) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

type RecentResponseItem = {
  id: number;
  submittedAt: Date;
  responseText: string;
  question: {
    text: string;
    category: string;
  };
};

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = Number(session.user.id);
  const firstInsight = await prisma.reflectionInsight.findUnique({
    where: {
      userId_type: {
        userId,
        type: "first_five",
      },
    },
  });

  const hasUnreadInsight = !!firstInsight && !firstInsight.viewedAt;

  const [user, recentResponses, responseCount] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
        name: true,
        city: true,
        countryCode: true,
        timezone: true,
        language: true,
        marketingEmails: true,
        dailyQuestionEmails: true,
        dailyReflectionTime: true,
      },
    }),
    prisma.response.findMany({
      where: { userId },
      include: {
        question: true,
      },
      orderBy: {
        submittedAt: "desc",
      },
      take: 2,
    }),
    prisma.response.count({
      where: { userId },
    }),
  ]);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10">
        <p className="mb-3 text-sm uppercase tracking-[0.12em] text-[#9A7D68]">
          Profile
        </p>

        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-medium text-[#6A4F3D]">
              Your space
            </h1>

            <p className="mt-3 text-[16px] leading-7 text-[#705847]">
              This is where account details, reflection history, and personal
              preferences can live together in one quiet place.
            </p>
          </div>

          <div className="shrink-0 self-start md:ml-8">
            <Image
              src="/logo-withinyou.png"
              alt="WithinYou"
              width={180}
              height={180}
              className="h-auto w-[90px] opacity-90 md:w-[110px]"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <ProfileForm
          key={`${user?.countryCode ?? ""}-${user?.dailyReflectionTime ?? ""}-${user?.dailyQuestionEmails ?? false}-${user?.marketingEmails ?? false}-${user?.language ?? "en"}-${user?.timezone ?? "UTC"}`}
          email={user?.email ?? session.user.email ?? ""}
          name={user?.name ?? null}
          city={user?.city ?? null}
          countryCode={user?.countryCode ?? null}
          timezone={user?.timezone ?? "UTC"}
          language={user?.language ?? "en"}
          marketingEmails={user?.marketingEmails ?? false}
          dailyQuestionEmails={user?.dailyQuestionEmails ?? true}
          dailyReflectionTime={user?.dailyReflectionTime ?? "00:00"}
        />

        <section className="rounded-[28px] bg-[#FBF6F0] px-7 py-8 md:px-10 md:py-10">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-medium text-[#6A4F3D]">
                Reflection history
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#8A6F5C]">
                A gentle record of your past reflections.
              </p>
            </div>
          </div>

          {recentResponses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#D8C5B3] px-5 py-6 text-sm leading-7 text-[#8A6F5C]">
              You do not have any saved reflections yet.
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {recentResponses.map((item: RecentResponseItem) => (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-[#E8D9CC] bg-[#FFFDFC] px-5 py-5"
                  >
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm text-[#9A7D68]">
                        {formatDate(item.submittedAt)}
                      </p>

                      <span className="rounded-full bg-[#F5ECE3] px-3 py-1 text-xs text-[#8B6B57]">
                        {item.question.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-medium leading-7 text-[#6A4F3D]">
                      {item.question.text}
                    </h3>

                    <p className="mt-3 text-[15px] leading-7 text-[#705847]">
                      {truncateText(item.responseText)}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <Link
                  href="/history"
                  className="text-sm text-[#8B6B57] underline underline-offset-4"
                >
                  See full history
                </Link>

                <Link
                  href="/insights"
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${hasUnreadInsight
                      ? "bg-[#D88B6A] text-white hover:bg-[#C97857]"
                      : "bg-[#F2E7DA] text-[#8B6B57] hover:bg-[#E8D9CC]"
                    }`}
                >
                  {hasUnreadInsight ? "View new insight" : "View insights"}
                </Link>
              </div>
            </>
          )}
        </section>

        <section className="rounded-[28px] bg-[#FBF6F0] px-7 py-8 md:px-8 md:py-9">
          <div className="mb-6">
            <h2 className="text-2xl font-medium text-[#6A4F3D]">Security</h2>
            <p className="mt-2 text-sm leading-6 text-[#8A6F5C]">
              Account access and permanent account actions.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-[#E8D9CC] bg-[#FFFDFC] px-5 py-4">
              <p className="text-sm text-[#9A7D68]">Password</p>

              <Link
                href="/password-change"
                className="mt-3 inline-block text-sm text-[#8B6B57] underline underline-offset-4"
              >
                Change password
              </Link>
            </div>
            <DeleteAccountCard />
            <div>

            </div>
          </div>
        </section>
      </div>
    </main>
  );
}