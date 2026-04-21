/// <reference types="node" />

import { PrismaClient } from "../src/generated/prisma";
import { questions } from "./data/questions";

const prisma = new PrismaClient();

async function main() {
  await prisma.response.deleteMany();
  await prisma.questionDelivery.deleteMany();
  await prisma.question.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      email: "test@example.com",
      passwordHash: "dev-only-placeholder",
    },
  });  
  
  const result = await prisma.question.createMany({
    data: questions,
  });

  console.log(`Seeded ${result.count} questions.`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });