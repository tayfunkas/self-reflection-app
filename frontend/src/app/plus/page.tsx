/*import Link from "next/link";

export default function PlusPage() {
    return (
        <main className="min-h-screen bg-[#F6EEE3] px-6 py-16 text-[#5F4636]">
            <section className="mx-auto max-w-3xl">
                <p className="mb-3 text-sm tracking-[0.18em] text-[#9A7D68] uppercase">
                    WithinYou Plus
                </p>

                <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
                    Deeper reflection, when you are ready for it.
                </h1>

                <p className="mt-6 text-base leading-8 text-[#7A5C49]">
                    WithinYou is designed to remain simple and quiet. You can freely
                    write daily reflections by answering one question a day and revisit
                    your recent reflections without a subscription.
                </p>

                <p className="mt-4 text-base leading-8 text-[#7A5C49]">
                    WithinYou Plus is optional and intended for people who would like
                    deeper insight into their reflections over time. With Plus, you
                    receive summaries, recurring themes, and gentle pattern analysis
                    after every 10 reflections. In months where you write more than
                    10 reflections, you also receive a reflective letter written from
                    your own reflections.
                </p>

                <section className="mt-10 text-sm leading-8 text-[#7A5C49]">
                </section>

                <section className="mt-10 rounded-3xl border border-[#E4D2C0] bg-[#FDF6EE] p-7">
                    <h2 className="text-xl font-medium">Pricing</h2>

                    <p className="mt-4 text-3xl font-medium text-[#5F4636]">
                        €5{" "}
                        <span className="text-base font-normal text-[#8A6F5A]">
                            / month
                        </span>
                    </p>

                    <p className="mt-4 text-sm leading-7 text-[#7A5C49]">
                        The daily reflection experience remains available without WithinYou
                        Plus. The subscription is only for deeper insight, full history,
                        search, filters, and AI-supported reflection features.
                    </p>

                    <div className="mt-8 overflow-hidden rounded-2xl border border-[#E4D2C0]">
                        <table className="w-full border-collapse text-left text-sm">
                            <thead className="bg-[#F1E5D8] text-[#5F4636]">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Feature</th>
                                    <th className="px-4 py-3 font-medium">Free</th>
                                    <th className="px-4 py-3 font-medium">Plus</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-[#E4D2C0] bg-[#FFF8F0] text-[#7A5C49]">
                                <TableRow feature="Daily reflection questions" free="Yes" plus="Yes" />
                                <TableRow feature="Recent reflection history" free="2 months" plus="Full history" />
                                <TableRow feature="First 5-reflection summary" free="Yes" plus="Yes" />
                                <TableRow feature="Summary every 10 reflections" free="No" plus="Yes" />
                                <TableRow feature="Monthly reflective letter" free="No" plus="Yes" />
                                <TableRow feature="Keyword search" free="No" plus="Yes" />
                                <TableRow feature="Category filters" free="No" plus="Yes" />
                                <TableRow feature="Pattern analysis" free="No" plus="Yes" />
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8">
                        <Link
                            href="/signup"
                            className="inline-flex rounded-full bg-[#7A5C49] px-5 py-2 text-sm text-[#FFF8F0] transition hover:bg-[#5F4636]"
                        >
                            Start reflecting
                        </Link>
                    </div>
                </section>

                <section className="mt-10 rounded-3xl bg-[#EFE1D2] p-7">
                    <h2 className="text-xl font-medium">Privacy and AI use</h2>

                    <div className="mt-5 space-y-4 text-sm leading-7 text-[#6F5543]">
                        <p>
                            Some WithinYou Plus features require sending your reflections to
                            trusted AI providers so that summaries, insights, and reflective
                            letters can be generated.
                        </p>

                        <p>
                            Your reflections are not sold. They are not used to train public AI
                            models. AI processing is used only to provide the reflection
                            features connected to your account.
                        </p>

                        <p>
                            You can delete individual reflections or your whole account at any
                            time.
                        </p>
                    </div>
                </section>
            </section>
        </main>
    );
}

function FeatureCard({ title, text }: { title: string; text: string }) {
    return (
        <div className="rounded-3xl bg-[#FFF8F0] p-6 shadow-sm">
            <h2 className="text-lg font-medium text-[#5F4636]">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-[#7A5C49]">{text}</p>
        </div>
    );
}

function TableRow({
    feature,
    free,
    plus,
}: {
    feature: string;
    free: string;
    plus: string;
}) {
    return (
        <tr>
            <td className="px-4 py-3">{feature}</td>
            <td className="px-4 py-3">{free}</td>
            <td className="px-4 py-3">{plus}</td>
        </tr>
    );
}*/

import Link from "next/link";
import { auth } from "../../../auth";
import prisma from "@/lib/prisma";
import { registerPlusInterest } from "./actions";

type PlusPageProps = {
  searchParams: Promise<{
    interested?: string;
  }>;
};

export default async function PlusPage({ searchParams }: PlusPageProps) {
  const session = await auth();
  const isLoggedIn = !!session?.user?.id;
  const { interested } = await searchParams;

  let hasRegisteredInterest = interested === "true";

  if (isLoggedIn) {
    const userId = Number(session.user.id);

    if (Number.isInteger(userId)) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { plusInterest: true },
      });

      hasRegisteredInterest = hasRegisteredInterest || !!user?.plusInterest;
    }
  }

  return (
    <main className="min-h-screen bg-[#F6EEE3] px-6 py-16 text-[#5F4636]">
      <section className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm tracking-[0.18em] text-[#9A7D68] uppercase">
          WithinYou Plus
        </p>

        <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
          Deeper reflection, when you are ready for it.
        </h1>

        <p className="mt-6 text-base leading-8 text-[#7A5C49]">
          WithinYou is designed to remain simple and quiet. You can freely write
          daily reflections by answering one question a day and revisit your
          recent reflections without a subscription.
        </p>

        <p className="mt-4 text-base leading-8 text-[#7A5C49]">
          WithinYou Plus is optional and intended for people who would like
          deeper insight into their reflections over time. With Plus, you
          receive summaries, recurring themes, and gentle pattern analysis after
          every 10 reflections. In months where you write more than 10
          reflections, you also receive a reflective letter written from your own
          reflections.
        </p>

        <section className="mt-10 rounded-3xl border border-[#E4D2C0] bg-[#FDF6EE] p-7">
          <h2 className="text-xl font-medium">Pricing</h2>

          <p className="mt-4 text-3xl font-medium text-[#5F4636]">
            €5{" "}
            <span className="text-base font-normal text-[#8A6F5A]">
              / month
            </span>
          </p>

          <p className="mt-4 text-sm leading-7 text-[#7A5C49]">
            Subscriptions are not available yet while WithinYou is being tested.
            You can register your interest, and you will be notified when
            WithinYou Plus becomes available.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[#E4D2C0]">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-[#F1E5D8] text-[#5F4636]">
                <tr>
                  <th className="px-4 py-3 font-medium">Feature</th>
                  <th className="px-4 py-3 font-medium">Free</th>
                  <th className="px-4 py-3 font-medium">Plus</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E4D2C0] bg-[#FFF8F0] text-[#7A5C49]">
                <TableRow
                  feature="Daily reflection questions"
                  free="Yes"
                  plus="Yes"
                />
                <TableRow
                  feature="Recent reflection history"
                  free="2 months"
                  plus="Full history"
                />
                <TableRow
                  feature="First 5-reflection summary"
                  free="Yes"
                  plus="Yes"
                />
                <TableRow
                  feature="Summary every 10 reflections"
                  free="No"
                  plus="Yes"
                />
                <TableRow
                  feature="Monthly reflective letter"
                  free="No"
                  plus="Yes"
                />
                <TableRow feature="Keyword search" free="No" plus="Yes" />
                <TableRow feature="Category filters" free="No" plus="Yes" />
                <TableRow feature="Pattern analysis" free="No" plus="Yes" />
              </tbody>
            </table>
          </div>

          <div className="mt-8">
            {hasRegisteredInterest ? (
              <p className="rounded-2xl bg-[#EFE1D2] px-5 py-4 text-sm leading-7 text-[#6F5543]">
                Thank you. Your interest in WithinYou Plus has been saved.
              </p>
            ) : isLoggedIn ? (
              <form action={registerPlusInterest}>
                <button
                  type="submit"
                  className="inline-flex rounded-full bg-[#7A5C49] px-5 py-2 text-sm text-[#FFF8F0] transition hover:bg-[#5F4636]"
                >
                  I am interested
                </button>
              </form>
            ) : (
              <Link
                href="/login?callbackUrl=/plus"
                className="inline-flex rounded-full bg-[#7A5C49] px-5 py-2 text-sm text-[#FFF8F0] transition hover:bg-[#5F4636]"
              >
                Log in to register interest
              </Link>
            )}
          </div>
        </section>

        <section className="mt-10 rounded-3xl bg-[#EFE1D2] p-7">
          <h2 className="text-xl font-medium">Privacy and AI use</h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-[#6F5543]">
            <p>
              Some WithinYou Plus features require sending your reflections to
              trusted AI providers so that summaries, insights, and reflective
              letters can be generated.
            </p>

            <p>
              Your reflections are not sold. They are not used to train public AI
              models. AI processing is used only to provide the reflection
              features connected to your account.
            </p>

            <p>
              You can delete individual reflections or your whole account at any
              time.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}

function TableRow({
  feature,
  free,
  plus,
}: {
  feature: string;
  free: string;
  plus: string;
}) {
  return (
    <tr>
      <td className="px-4 py-3">{feature}</td>
      <td className="px-4 py-3">{free}</td>
      <td className="px-4 py-3">{plus}</td>
    </tr>
  );
}