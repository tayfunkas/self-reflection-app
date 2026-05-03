import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import { getOrCreateTodayDelivery } from "@/lib/question-delivery";
import { submitResponse } from "./actions";

export default async function TodayPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = Number(session.user.id);
  const delivery = await getOrCreateTodayDelivery(userId);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 md:py-14">
      <section className="rounded-[28px] bg-[#FBF6F0] px-7 py-8 md:px-10 md:py-10">
        <p className="mb-3 text-sm tracking-[0.12em] text-[#9A7D68] uppercase">
          Today&apos;s Question
        </p>

        <h1 className="mb-4 text-3xl leading-relaxed font-medium text-[#6A4F3D]">
          {delivery.question.text}
        </h1>

        <p className="mb-8 text-sm text-[#9A7D68]">
  {delivery.response
    ? "Come back tomorrow for a new question. Have a gentle day."
    : "There is no right way to answer. Just begin where you are."}
</p>

        {delivery.response ? (
          <div className="rounded-[22px] bg-[#F6EEE3] px-5 py-5">
            <p className="mb-2 text-sm text-[#9A7D68]">
              Your reflection for today
            </p>
            <p className="whitespace-pre-wrap text-[16px] leading-8 text-[#5F4636]">
              {delivery.response.responseText}
            </p>
          </div>
        ) : (
          <form action={submitResponse} className="space-y-5">
            <input type="hidden" name="deliveryId" value={delivery.id} />

            <textarea
              name="responseText"
              rows={9}
  required
  maxLength={5000}
  placeholder="Write here..."
  className="w-full rounded-[22px] bg-[#F6EEE3] px-5 py-4 text-[16px] leading-8 text-[#5F4636] placeholder:text-[#B19783] outline-none transition focus:ring-2 focus:ring-[#E8B59A]"
            />

            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-[#9A7D68]">
              Write as you like. The maximum character limit is 5000.
              </p>

              <button
                type="submit"
                className="rounded-full bg-[#D88B6A] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#C97857]"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}