type VerifyEmailSentPageProps = {
    searchParams: Promise<{ email?: string }>;
  };
  
  export default async function VerifyEmailSentPage({
    searchParams,
  }: VerifyEmailSentPageProps) {
    const { email } = await searchParams;
  
    return (
      <main className="mx-auto max-w-xl px-6 py-16">
        <h1 className="text-2xl font-semibold">Check your inbox</h1>
        <p className="mt-4 text-sm text-neutral-600">
          We sent a verification link to {email ?? "your email address"}.
        </p>
        <p className="mt-2 text-sm text-neutral-600">
          You can log in right away and browse today’s question, but you will need to verify your email before writing and saving reflections.
        </p>
      </main>
    );
  }