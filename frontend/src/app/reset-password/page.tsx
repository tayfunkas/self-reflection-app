import { resetPassword } from "./actions";

type ResetPasswordPageProps = {
  searchParams: Promise<{
    token?: string;
    error?: string;
  }>;
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { token, error } = await searchParams;

  return (
    <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-md items-center px-6 py-16">
      <section className="w-full rounded-3xl border border-[#E8DDD3] bg-[#FFF9F5] p-8 shadow-sm">
        <p className="mb-3 text-sm uppercase tracking-[0.18em] text-[#7A6E63]">
          Self Reflection
        </p>

        <h1 className="mb-3 text-3xl font-semibold text-[#3B342E]">
          Choose a new password
        </h1>

        <p className="mb-8 text-sm leading-6 text-[#6F6257]">
          Your new password must be at least 8 characters.
        </p>

        {error ? (
          <p className="mb-5 rounded-2xl border border-[#E8C9C9] bg-[#FFF4F4] px-4 py-3 text-sm text-[#8A4A4A]">
            {error}
          </p>
        ) : null}

        <form action={resetPassword} className="space-y-4">
          <input type="hidden" name="token" value={token ?? ""} />

          <div>
            <label className="text-sm text-[#6F6257]">New password</label>
            <input
              name="password"
              type="password"
              required
              className="mt-2 w-full rounded-xl border border-[#E8D9CC] bg-[#FFFDFC] px-4 py-3 text-[#705847] outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-[#6F6257]">
              Confirm new password
            </label>
            <input
              name="confirmPassword"
              type="password"
              required
              className="mt-2 w-full rounded-xl border border-[#E8D9CC] bg-[#FFFDFC] px-4 py-3 text-[#705847] outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-[#6A4F3D] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            Update password
          </button>
        </form>
      </section>
    </main>
  );
}