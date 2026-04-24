import { redirect } from "next/navigation";
import { PasswordChangeSuccessRedirect } from "./password-change-success-redirect";
import { auth } from "../../../auth";
import { changePassword } from "./actions";

type PasswordChangePageProps = {
    searchParams: Promise<{
        error?: string;
        success?: string;
    }>;
};

export default async function PasswordChangePage({
    searchParams,
}: PasswordChangePageProps) {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    const { error, success } = await searchParams;

    return (
        <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-md items-center px-6 py-16">
            <section className="w-full rounded-3xl border border-[#E8DDD3] bg-[#FFF9F5] p-8 shadow-sm">
                <p className="mb-3 text-sm uppercase tracking-[0.18em] text-[#7A6E63]">
                    Security
                </p>

                <h1 className="mb-3 text-3xl font-semibold text-[#3B342E]">
                    Change password
                </h1>

                <p className="mb-8 text-sm leading-6 text-[#6F6257]">
                    Enter your current password and choose a new one.
                </p>

                {error ? (
                    <p className="mb-5 rounded-2xl border border-[#E8C9C9] bg-[#FFF4F4] px-4 py-3 text-sm text-[#8A4A4A]">
                        {error}
                    </p>
                ) : null}

                {success === "1" ? (
                    <>
                        <p className="mb-5 rounded-2xl border border-[#D8E7D1] bg-[#F4FAF1] px-4 py-3 text-sm leading-6 text-[#4E6B43]">
                            Your password has been changed successfully. You will be redirected back
                            to your profile shortly.
                        </p>

                        <PasswordChangeSuccessRedirect />
                    </>
                ) : null}

                <form action={changePassword} className="space-y-4">
                    <div>
                        <label className="text-sm text-[#6F6257]">Current password</label>
                        <input
                            name="currentPassword"
                            type="password"
                            required
                            className="mt-2 w-full rounded-xl border border-[#E8D9CC] bg-[#FFFDFC] px-4 py-3 text-[#705847] outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-[#6F6257]">New password</label>
                        <input
                            name="newPassword"
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
                        Change password
                    </button>
                </form>
            </section>
        </main>
    );
}