/*import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import prisma from "@/lib/prisma";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function truncateText(text: string, maxLength = 240) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

type HistoryItem = {
  id: number;
  submittedAt: Date;
  responseText: string;
  question: {
    text: string;
    category: string;
  };
};

export default async function HistoryPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = Number(session.user.id);

  const [responses, responseCount] = await Promise.all([
    prisma.response.findMany({
      where: { userId },
      include: {
        question: {
          select: {
            text: true,
            category: true,
          },
        },
      },
      orderBy: {
        submittedAt: "desc",
      },
    }),
    prisma.response.count({
      where: { userId },
    }),
  ]);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8">
        <Link
          href="/profile"
          className="text-sm text-[#8B6B57] underline underline-offset-4"
        >
          Back to profile
        </Link>

        <p className="mt-6 mb-3 text-sm uppercase tracking-[0.12em] text-[#9A7D68]">
          History
        </p>

        <h1 className="text-3xl font-medium text-[#6A4F3D]">
          Your reflections
        </h1>

        <p className="mt-3 max-w-2xl text-[16px] leading-7 text-[#705847]">
          A complete record of your past reflections, kept in one calm place.
        </p>
      </div>

      <section className="rounded-[28px] bg-[#FBF6F0] px-7 py-8 md:px-10 md:py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-medium text-[#6A4F3D]">
              Full history
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#8A6F5C]">
              Open any reflection to read the full entry.
            </p>
          </div>

          <span className="rounded-full bg-[#F2E7DA] px-4 py-2 text-xs uppercase tracking-[0.08em] text-[#8B6B57]">
            {responseCount} saved
          </span>
        </div>

        {responses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#D8C5B3] px-5 py-6 text-sm leading-7 text-[#8A6F5C]">
            You do not have any saved reflections yet.
          </div>
        ) : (
          <div className="space-y-4">
            {responses.map((item: HistoryItem) => (
              <details
                key={item.id}
                className="group rounded-2xl border border-[#E8D9CC] bg-[#FFFDFC] px-5 py-5 open:bg-[#FFFCF8]"
              >
                <summary className="cursor-pointer list-none">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-[#9A7D68]">
                        {formatDate(item.submittedAt)} at {formatTime(item.submittedAt)}
                      </p>
                    </div>

                    <span className="rounded-full bg-[#F5ECE3] px-3 py-1 text-xs text-[#8B6B57]">
                      {item.question.category}
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-medium leading-7 text-[#6A4F3D]">
                    {item.question.text}
                  </h3>

                  <p className="mt-3 text-[15px] leading-7 text-[#705847] group-open:hidden">
                    {truncateText(item.responseText)}
                  </p>

                  <p className="mt-4 text-sm text-[#8B6B57] underline underline-offset-4 group-open:hidden">
                    Read full reflection
                  </p>
                </summary>

                <div className="mt-4 border-t border-[#EFE2D6] pt-4">
                  <p className="text-[15px] leading-8 whitespace-pre-wrap text-[#705847]">
                    {item.responseText}
                  </p>

                  <p className="mt-4 text-sm text-[#8B6B57]">
                    Click again to collapse
                  </p>
                </div>
              </details>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}*/

import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import prisma from "@/lib/prisma";
import ReflectionHistoryList from "./reflection-history-list";

type HistoryItem = {
  id: number;
  deliveryId: number;
  questionId: number;
  submittedAt: Date | string;
  responseText: string;
  question: {
    text: string;
    category: string;
  };
};

export default async function HistoryPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = Number(session.user.id);

  const [responses, responseCount] = await Promise.all([
    prisma.response.findMany({
      where: { userId },
      include: {
        question: {
          select: {
            text: true,
            category: true,
          },
        },
      },
      orderBy: {
        submittedAt: "desc",
      },
    }),
    prisma.response.count({
      where: { userId },
    }),
  ]);

  const historyItems: HistoryItem[] = responses.map((item) => ({
    id: item.id,
    deliveryId: item.deliveryId,
    questionId: item.questionId,
    submittedAt: item.submittedAt,
    responseText: item.responseText,
    question: {
      text: item.question.text,
      category: item.question.category,
    },
  }));

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8">
        <Link
          href="/profile"
          className="text-sm text-[#8B6B57] underline underline-offset-4"
        >
          Back to profile
        </Link>

        <p className="mb-3 mt-6 text-sm uppercase tracking-[0.12em] text-[#9A7D68]">
          History
        </p>

        <h1 className="text-3xl font-medium text-[#6A4F3D]">
          Your reflections
        </h1>

        <p className="mt-3 max-w-2xl text-[16px] leading-7 text-[#705847]">
          A complete record of your past reflections, kept in one calm place.
        </p>
      </div>

      <section className="rounded-[28px] bg-[#FBF6F0] px-7 py-8 md:px-10 md:py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-medium text-[#6A4F3D]">
              Full history
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#8A6F5C]">
              Open any reflection to read the full entry.
            </p>
          </div>

          <span className="rounded-full bg-[#F2E7DA] px-4 py-2 text-xs uppercase tracking-[0.08em] text-[#8B6B57]">
            {responseCount} saved
          </span>
        </div>

        {historyItems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#D8C5B3] px-5 py-6 text-sm leading-7 text-[#8A6F5C]">
            You do not have any saved reflections yet.
          </div>
        ) : (
          <ReflectionHistoryList items={historyItems} />
        )}
      </section>
    </main>
  );
}