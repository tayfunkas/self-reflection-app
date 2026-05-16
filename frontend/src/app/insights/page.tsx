// src/app/insights/page.tsx

/*import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import prisma from "@/lib/prisma";

export default async function InsightsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = Number(session.user.id);

  const responseCount = await prisma.response.count({
    where: {
      userId,
    },
  });

  const firstInsight = await prisma.reflectionInsight.findUnique({
    where: {
      userId_type: {
        userId,
        type: "first_five",
      },
    },
  });

  return (
    <main className="min-h-screen bg-[#F6EEE3] px-6 py-12 text-[#5F4636]">
      <section className="mx-auto max-w-3xl">
        <Link
          href="/profile"
          className="mb-8 inline-block text-sm text-[#8A6F5C] hover:text-[#5F4636]"
        >
          ← Back to profile
        </Link>

        <div className="rounded-[32px] bg-[#FBF6F0] px-7 py-8 shadow-sm md:px-10 md:py-10">
          <p className="mb-3 text-sm tracking-[0.18em] text-[#9A7D68] uppercase">
            Reflection insight
          </p>

          <h1 className="text-3xl font-medium tracking-tight text-[#6A4F3D] md:text-4xl">
            Your first reflection insight
          </h1>

          {!firstInsight && responseCount < 5 && (
            <div className="mt-8 space-y-5 text-base leading-8 text-[#705847]">
              <p>
                You have completed {responseCount}{" "}
                {responseCount === 1 ? "reflection" : "reflections"} so far.
              </p>

              <p>
                After your first 5 reflections, WithinYou will prepare a gentle
                insight based on early patterns in your writing.
              </p>

              <p className="rounded-2xl bg-[#F6EEE3] px-5 py-4 text-sm leading-7 text-[#8A6F5C]">
                This insight will not be a diagnosis, evaluation, or advice. It
                will simply reflect possible themes that appear in your own
                words.
              </p>

              <Link
                href="/today"
                className="inline-block rounded-xl bg-[#7A5C49] px-5 py-3 text-sm font-medium text-white hover:bg-[#6A4F3D]"
              >
                Continue reflecting
              </Link>
            </div>
          )}

          {!firstInsight && responseCount >= 1 && (
            <div className="mt-8 space-y-5 text-base leading-8 text-[#705847]">
              <p>
                You have completed enough reflections for your first insight,
                but it has not been generated yet.
              </p>

              <p>
                This can happen if the AI request failed or was interrupted. You
                can continue using WithinYou normally.
              </p>
            </div>
          )}

          {firstInsight && (
            <div className="mt-8 space-y-7">
              <div className="rounded-2xl bg-[#F6EEE3] px-5 py-4 text-sm leading-7 text-[#8A6F5C]">
                This insight is AI-generated and based only on your first five
                reflections. It is not a diagnosis, evaluation, or professional
                advice.
              </div>

              <article className="whitespace-pre-line text-base leading-8 text-[#5F4636]">
                {firstInsight.content}
              </article>

              <p className="border-t border-[#E8D9CC] pt-6 text-sm leading-7 text-[#8A6F5C]">
                Generated on{" "}
                {firstInsight.createdAt.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}*/

import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import prisma from "@/lib/prisma";
import { generateFirstReflectionInsightIfNeeded } from "@/lib/reflection-insight-service";
import { revalidatePath } from "next/cache";

export default async function InsightsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = Number(session.user.id);

  const responseCount = await prisma.response.count({
    where: {
      userId,
    },
  });

  let firstInsight = await prisma.reflectionInsight.findUnique({
    where: {
      userId_type: {
        userId,
        type: "first_five",
      },
    },
  });

  if (!firstInsight) {
    try {
      firstInsight = await generateFirstReflectionInsightIfNeeded(userId);
    } catch (error) {
      console.error("Failed to generate insight from insights page:", error);
    }
  }

  if (firstInsight && !firstInsight.viewedAt) {
    firstInsight = await prisma.reflectionInsight.update({
      where: {
        id: firstInsight.id,
      },
      data: {
        viewedAt: new Date(),
      },
    });
  }

  if (firstInsight && !firstInsight.viewedAt) {
    firstInsight = await prisma.reflectionInsight.update({
      where: {
        id: firstInsight.id,
      },
      data: {
        viewedAt: new Date(),
      },
    });
  
    revalidatePath("/profile");
    revalidatePath("/today");
  }

  return (
    <main className="min-h-screen bg-[#F6EEE3] px-6 py-12 text-[#5F4636]">
      <section className="mx-auto max-w-3xl">
        <Link
          href="/profile"
          className="mb-8 inline-block text-sm text-[#8A6F5C] hover:text-[#5F4636]"
        >
          ← Back to profile
        </Link>

        <div className="rounded-[32px] bg-[#FBF6F0] px-7 py-8 shadow-sm md:px-10 md:py-10">
          <p className="mb-3 text-sm tracking-[0.18em] text-[#9A7D68] uppercase">
            Reflection insight
          </p>

          <h1 className="text-3xl font-medium tracking-tight text-[#6A4F3D] md:text-4xl">
            Your first reflection insight
          </h1>

          {!firstInsight && responseCount < 5 && (
            <div className="mt-8 space-y-5 text-base leading-8 text-[#705847]">
              <p>
                You have completed {responseCount}{" "}
                {responseCount === 1 ? "reflection" : "reflections"} so far.
              </p>

              <p>
                After your first 5 reflections, WithinYou will prepare a gentle
                insight based on early patterns in your writing.
              </p>

              <p className="rounded-2xl bg-[#F6EEE3] px-5 py-4 text-sm leading-7 text-[#8A6F5C]">
                This insight will not be a diagnosis, evaluation, or advice. It
                will simply reflect possible themes that appear in your own
                words.
              </p>

              <Link
                href="/today"
                className="inline-block rounded-xl bg-[#7A5C49] px-5 py-3 text-sm font-medium text-white hover:bg-[#6A4F3D]"
              >
                Continue reflecting
              </Link>
            </div>
          )}

          {!firstInsight && responseCount >= 5 && (
            <div className="mt-8 space-y-5 text-base leading-8 text-[#705847]">
              <p>
                You have completed enough reflections for your first insight,
                but it could not be generated right now.
              </p>

              <p>
                Please try opening this page again later. You can continue using
                WithinYou normally.
              </p>
            </div>
          )}

          {firstInsight && (
            <div className="mt-8 space-y-7">
              <div className="rounded-2xl bg-[#F6EEE3] px-5 py-4 text-sm leading-7 text-[#8A6F5C]">
                This insight is AI-generated and based only on your first five
                reflections. It is not a diagnosis, evaluation, or professional
                advice.
              </div>

              <article className="whitespace-pre-line text-base leading-8 text-[#5F4636]">
                {firstInsight.content}
              </article>

              <p className="border-t border-[#E8D9CC] pt-6 text-sm leading-7 text-[#8A6F5C]">
                Generated on{" "}
                {firstInsight.createdAt.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}