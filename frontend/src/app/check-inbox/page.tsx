/*type VerifyEmailSentPageProps = {
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
          Please verify your email so you can start saving your reflections.
        </p>
      </main>
    );
  }*/

    import Image from "next/image";
    import { resendVerificationEmail } from "./actions";
    
    type VerifyEmailSentPageProps = {
      searchParams: Promise<{
        email?: string;
        resent?: string;
      }>;
    };
    
    export default async function VerifyEmailSentPage({
      searchParams,
    }: VerifyEmailSentPageProps) {
      const { email, resent } = await searchParams;
    
      return (
        <main className="mx-auto flex min-h-screen max-w-4xl items-center px-6 py-16">
          <div className="grid w-full gap-10 md:grid-cols-[180px_1fr] md:items-start">
            <div className="flex justify-center md:justify-start">
              <Image
                src="/logo-withinyou.png"
                alt="App logo"
                width={220}
                height={220}
                priority
                className="h-auto w-28 opacity-90"
              />
            </div>
    
            <section className="max-w-xl">
              <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
                <h1 className="text-2xl font-semibold text-neutral-900">
                  Check your inbox
                </h1>
    
                <p className="mt-4 text-sm leading-6 text-neutral-600">
                  We sent a verification link to{" "}
                  <span className="font-semibold text-neutral-900">
                    {email ?? "your email address"}
                  </span>
                  .
                </p>
    
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  Please verify your email so you can start saving your reflections.
                </p>
              </div>
    
              <div className="mt-6">
                <p className="text-sm leading-6 text-neutral-500">
                  If you do not receive the verification email soon, please check
                  your spam folder. The link expires after 24 hours.
                </p>
    
                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  If you still cannot find the email, you can request a new
                  verification link.
                </p>
              </div>
    
              {resent === "1" && (
                <p className="mt-4 text-sm font-semibold text-neutral-600">
                  A new verification email has been sent.
                </p>
              )}
    
              <form action={resendVerificationEmail} className="mt-6">
                <input type="hidden" name="email" value={email ?? ""} />
    
                <button
                  type="submit"
                  className="rounded-md border border-neutral-300 px-4 py-2 text-sm text-neutral-700 transition hover:bg-neutral-50"
                >
                  Resend verification email
                </button>
              </form>
            </section>
          </div>
        </main>
      );
    }