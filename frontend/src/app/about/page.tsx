import Image from "next/image";
import Link from "next/link";

    export default function AboutPage() {
      return (
        <main className="mx-auto max-w-3xl px-6 py-12">
          <section className="rounded-[28px] bg-[#FBF6F0] px-7 py-8 md:px-10 md:py-10">
          <p className="mb-3 text-sm uppercase tracking-[0.12em] text-[#9A7D68]">
  About
</p>

<div className="mb-6 flex justify-center">
  <Image
    src="/logo-withinyou.png"
    alt="WithinYou"
    width={140}
    height={140}
    className="h-auto w-[90px] md:w-[110px]"
  />
</div>

<h1 className="mb-6 text-3xl font-medium text-[#6A4F3D]">
  A quieter kind of space
</h1>
    
            <div className="space-y-5 text-[16px] leading-8 text-[#705847]">
              <p>
                WithinYou offers one thoughtful question each day to help you
                pause and notice what is happening within you.
              </p>
    
              <p>
                It is intentionally simple. No noise, no pressure, no performance.
                Just a small daily invitation to reflect honestly in your own words.
              </p>
    
              <p>
                Make sure to subscribe to our daily emails to receive your question.
                That may be the only email that is all about you today.
              </p>
    
              <p>
                The aim is not to optimize you. The aim is to make space for you.
              </p>
            </div>
    
            <div className="mt-10 border-t border-[#E8D9CC]">
  <p className="pt-6 mb-4 text-[16px] leading-8 text-[#705847]">
    If you'd like to know more, you can explore:
  </p>
    
              <div className="flex flex-col gap-3 text-sm text-[#8B6B57]">
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-[#6A4F3D]"
                >
                  Privacy Policy
                </Link>
    
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-[#6A4F3D]"
                >
                  Terms of Service
                </Link>

              </div>
            </div>
          </section>
        </main>
      );
    }