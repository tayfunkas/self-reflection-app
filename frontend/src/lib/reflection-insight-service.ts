import OpenAI from "openai";
import prisma from "@/lib/prisma";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// TEMPORARY FOR TESTING.
// Change this back to 5 after confirming the flow works.
const FIRST_INSIGHT_RESPONSE_COUNT = 5;

type ReflectionForInsight = {
  question: {
    text: string;
    category: string;
  };
  responseText: string;
  submittedAt: Date;
};

function buildFirstInsightPrompt(reflections: ReflectionForInsight[]) {
  const formattedReflections = reflections
    .map((reflection, index) => {
      return `
Reflection ${index + 1}
Question: ${reflection.question.text}
Category: ${reflection.question.category}
Answer: ${reflection.responseText}
`;
    })
    .join("\n---\n");

  return `
You are writing a gentle reflection insight for a self-reflection app called WithinYou.

Use only the user's reflections below.

Important rules:
- Do not diagnose.
- Do not use therapy language.
- Do not claim certainty.
- Do not give strong advice.
- Do not mention mental health conditions.
- Write warmly, calmly, and thoughtfully.
- Focus on recurring themes, tensions, values, and questions.
- Keep it personal but not invasive.
- Use "you may notice", "there seems to be", "one possible pattern" rather than absolute claims.
- Avoid em dashes.
- Avoid overly polished or symmetrical phrasing.
- Do not sound like a coach, therapist, or productivity writer.
- Write more like a thoughtful human reflection than an article.
- Avoid repetitive transition phrases like "another recurring theme" or "finally".

Structure:
Write in flowing paragraphs rather than explicit sections or lists.
The reflection should feel natural, calm, and personal.

Length: 250-400 words.

Reflections:
${formattedReflections}
`;
}

export async function generateFirstReflectionInsightIfNeeded(userId: number) {
  console.log("INSIGHT CHECK STARTED for user:", userId);

  const existingInsight = await prisma.reflectionInsight.findUnique({
    where: {
      userId_type: {
        userId,
        type: "first_five",
      },
    },
  });

  console.log("Existing first insight:", !!existingInsight);

  if (existingInsight) {
    console.log("Insight already exists. Skipping generation.");
    return existingInsight;
  }

  const responseCount = await prisma.response.count({
    where: {
      userId,
    },
  });

  console.log("Response count:", responseCount);
  console.log("Required count:", FIRST_INSIGHT_RESPONSE_COUNT);

  if (responseCount !== FIRST_INSIGHT_RESPONSE_COUNT) {
    console.log("Insight skipped because response count does not match.");
    return null;
  }

  const reflections = await prisma.response.findMany({
    where: {
      userId,
    },
    include: {
      question: {
        select: {
          text: true,
          category: true,
        },
      },
    },
    orderBy: {
      submittedAt: "asc",
    },
    take: FIRST_INSIGHT_RESPONSE_COUNT,
  });

  console.log("Reflections loaded for insight:", reflections.length);

  if (reflections.length !== FIRST_INSIGHT_RESPONSE_COUNT) {
    console.log("Insight skipped because reflection loading count does not match.");
    return null;
  }

  const prompt = buildFirstInsightPrompt(reflections);

  console.log("Calling OpenAI for reflection insight...");

  const result = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
  });

  const content = result.output_text?.trim();

  console.log("OpenAI insight received:", !!content);

  if (!content) {
    throw new Error("OpenAI returned an empty insight.");
  }

  const insight = await prisma.reflectionInsight.create({
    data: {
      userId,
      type: "first_five",
      content,
    },
  });

  console.log("Reflection insight saved with id:", insight.id);

  return insight;
}