export default function InsightsLoading() {
    return (
      <main className="min-h-screen bg-[#F6EEE3] px-6 py-12 text-[#5F4636]">
        <section className="mx-auto max-w-3xl">
          <div className="rounded-[32px] bg-[#FBF6F0] px-7 py-8 shadow-sm md:px-10 md:py-10">
            <p className="mb-3 text-sm tracking-[0.18em] text-[#9A7D68] uppercase">
              Reflection insight
            </p>
  
            <h1 className="text-3xl font-medium tracking-tight text-[#6A4F3D] md:text-4xl">
              Preparing your insight
            </h1>
  
            <div className="mt-8 space-y-4 text-base leading-8 text-[#705847]">
              <p>
                WithinYou is reading your reflections and preparing a gentle
                insight.
              </p>
  
              <p className="rounded-2xl bg-[#F6EEE3] px-5 py-4 text-sm leading-7 text-[#8A6F5C]">
                This may take a few moments.
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }