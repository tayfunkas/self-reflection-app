import { NextResponse } from "next/server";
import { sendDueDailyQuestionEmails } from "@/lib/daily-question-email-service";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await sendDueDailyQuestionEmails();

  return NextResponse.json(result);
}