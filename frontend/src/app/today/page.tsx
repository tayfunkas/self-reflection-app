import { getOrCreateTodayDelivery, getTestUser } from "@/lib/question-delivery";
import { submitResponse } from "./actions";

export default async function TodayPage() {
  const user = await getTestUser();
  const delivery = await getOrCreateTodayDelivery(user.id);

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Today&apos;s Question</h1>

      <div className="rounded-lg border p-4">
        <p className="mb-4 text-lg">{delivery.question.text}</p>

        {delivery.response ? (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Your response</h2>
            <p className="whitespace-pre-wrap">{delivery.response.responseText}</p>
          </div>
        ) : (
          <form action={submitResponse} className="space-y-4">
            <input type="hidden" name="deliveryId" value={delivery.id} />

            <textarea
              name="responseText"
              rows={6}
              required
              className="w-full rounded-md border p-3"
              placeholder="Write your reflection here..."
            />

            <button
              type="submit"
              className="rounded-md border px-4 py-2"
            >
              Save response
            </button>
          </form>
        )}
      </div>
    </main>
  );
}