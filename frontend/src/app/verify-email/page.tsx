import Link from "next/link";
import { consumeEmailVerificationToken } from "@/lib/verification-token";

type VerifyEmailPageProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <main className="mx-auto max-w-xl px-6 py-16">
        <h1 className="text-2xl font-semibold">Invalid verification link</h1>
        <p className="mt-4 text-sm text-neutral-600">
          The verification link is missing a token.
        </p>
        <Link href="/login" className="mt-6 inline-block underline">
          Go to login
        </Link>
      </main>
    );
  }

  const result = await consumeEmailVerificationToken(token);

  if (!result.success) {
    return (
      <main className="mx-auto max-w-xl px-6 py-16">
        <h1 className="text-2xl font-semibold">Verification failed</h1>
        <p className="mt-4 text-sm text-neutral-600">
          {result.reason === "expired"
            ? "This verification link has expired."
            : "This verification link is invalid."}
        </p>
        <Link href="/login" className="mt-6 inline-block underline">
          Go to login
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-2xl font-semibold">Email verified</h1>
      <p className="mt-4 text-sm text-neutral-600">
        Your email has been verified. You can now refresh the app or log in again.
      </p>
      <Link href="/login?verified=1" className="mt-6 inline-block underline">
        Go to login
      </Link>
    </main>
  );
}