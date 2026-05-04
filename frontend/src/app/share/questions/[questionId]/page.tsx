import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Image from "next/image";

type SharedQuestionPageProps = {
  params: Promise<{
    questionId: string;
  }>;
};

export async function generateMetadata({ params }: SharedQuestionPageProps) {
    const { questionId } = await params;
    const id = Number(questionId);
  
    if (!Number.isInteger(id) || id <= 0) {
      return {
        title: "WithinYou Reflection Question",
      };
    }
  
    const question = await prisma.question.findUnique({
      where: { id },
      select: { text: true },
    });
  
    if (!question) {
      return {
        title: "WithinYou Reflection Question",
      };
    }
  
    return {
      title: "A reflection question from WithinYou",
      description: question.text,
      openGraph: {
        title: "A reflection question from WithinYou",
        description: question.text,
        type: "website",
      },
    };
  }

export default async function SharedQuestionPage({
  params,
}: SharedQuestionPageProps) {
  const { questionId } = await params;
  const id = Number(questionId);

  if (!Number.isInteger(id) || id <= 0) {
    notFound();
  }

  const question = await prisma.question.findUnique({
    where: { id },
    select: {
      id: true,
      text: true,
    },
  });

  if (!question) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
          <div className="mb-8 flex justify-center">
    <Link href="/">
      <Image
        src="/logo-withinyou.png" 
        alt="WithinYou"
        width={140}
        height={140}
        className="opacity-90 hover:opacity-100 transition"
        priority
      />
    </Link>
  </div>
      <section className="rounded-[28px] bg-[#FBF6F0] px-7 py-10 md:px-10 md:py-12">
        <p className="mb-3 text-sm tracking-[0.12em] text-[#9A7D68] uppercase">
          A shared reflection question
        </p>

        <h1 className="mb-6 text-3xl leading-relaxed font-medium text-[#6A4F3D]">
          {question.text}
        </h1>

        <p className="mb-8 text-sm leading-7 text-[#9A7D68]">
          WithinYou gives you one quiet question a day for self-reflection.
          Your own daily question may be different, chosen just for your day.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/signup"
            className="rounded-full bg-[#D88B6A] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#C97857]"
          >
            Start reflecting
          </Link>

          <Link
            href="/login"
            className="rounded-full border border-[#E8D9CC] px-6 py-3 text-sm font-medium text-[#7A5C49] transition hover:bg-[#F6EEE3]"
          >
            Log in
          </Link>
        </div>
      </section>
    </main>
  );
}