import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import prisma from "@/lib/prisma";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = Number(session.user.id);

  const responses = await prisma.response.findMany({
    where: {
      userId,
    },
    include: {
      question: true,
    },
    orderBy: {
      submittedAt: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8">
        <p className="mb-3 text-sm uppercase tracking-[0.12em] text-[#9A7D68]">
          Profile
        </p>
        <h1 className="text-3xl font-medium text-[#6A4F3D]">Your space</h1>
        <p className="mt-3 max-w-2xl text-[16px] leading-7 text-[#705847]">
          This is where account details, reflection history, and personal
          preferences can live together in one quiet place.
        </p>
      </div>

      <div className="grid gap-6">
        <section className="rounded-[28px] bg-[#FBF6F0] px-7 py-8 md:px-10 md:py-10">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-medium text-[#6A4F3D]">Account</h2>
              <p className="mt-2 text-sm leading-6 text-[#8A6F5C]">
                Email is required. Other profile details are optional.
              </p>
            </div>
            <span className="rounded-full bg-[#F2E7DA] px-4 py-2 text-xs uppercase tracking-[0.08em] text-[#8B6B57]">
              Basic info
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <ProfileField label="Email" value={session.user.email ?? ""} />
            <ProfileField label="Name" value="Not added yet" muted />
            <ProfileField label="Country" value="Not added yet" muted />
            <ProfileField label="City" value="Not added yet" muted />
          </div>
        </section>

        <section className="rounded-[28px] bg-[#FBF6F0] px-7 py-8 md:px-10 md:py-10">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-medium text-[#6A4F3D]">
                Reflection history
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#8A6F5C]">
                A gentle record of your past reflections.
              </p>
            </div>
            <span className="rounded-full bg-[#F2E7DA] px-4 py-2 text-xs uppercase tracking-[0.08em] text-[#8B6B57]">
              {responses.length} saved
            </span>
          </div>

          {responses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#D8C5B3] px-5 py-6 text-sm leading-7 text-[#8A6F5C]">
              You do not have any saved reflections yet.
            </div>
          ) : (
            <div className="space-y-4">
              {responses.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-[#E8D9CC] bg-[#FFFDFC] px-5 py-5"
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-[#9A7D68]">
                      {formatDate(item.submittedAt)}
                    </p>
                    <span className="rounded-full bg-[#F5ECE3] px-3 py-1 text-xs text-[#8B6B57]">
                      {item.question.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-medium leading-7 text-[#6A4F3D]">
                    {item.question.text}
                  </h3>

                  <p className="mt-3 text-[15px] leading-7 text-[#705847]">
                    {item.responseText}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-[28px] bg-[#FBF6F0] px-7 py-8 md:px-8 md:py-9">
            <div className="mb-6">
              <h2 className="text-2xl font-medium text-[#6A4F3D]">
                Preferences
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#8A6F5C]">
                These can become editable once preferences are added.
              </p>
            </div>

            <div className="space-y-4">
              <ProfileField
                label="Daily reflection time"
                value="Default (midnight)"
              />
              <ProfileField label="Language" value="English" />
            </div>
          </section>

          <section className="rounded-[28px] bg-[#FBF6F0] px-7 py-8 md:px-8 md:py-9">
            <div className="mb-6">
              <h2 className="text-2xl font-medium text-[#6A4F3D]">
                Security
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#8A6F5C]">
                These settings will make more sense once authentication is in
                place.
              </p>
            </div>

            <div className="space-y-4">
              <ProfileField
                label="Password"
                value="Available after authentication"
                muted
              />
              <ProfileField
                label="Sign-in method"
                value="Coming soon"
                muted
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function ProfileField({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[#E8D9CC] bg-[#FFFDFC] px-5 py-4">
      <p className="text-sm text-[#9A7D68]">{label}</p>
      <p
        className={`mt-2 text-[16px] leading-7 ${
          muted ? "text-[#A08A79]" : "text-[#705847]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}