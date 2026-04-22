export default function PrivacyPage() {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12">
        <section className="rounded-[28px] bg-[#FBF6F0] px-7 py-8 md:px-10 md:py-10">
          <p className="mb-3 text-sm uppercase tracking-[0.12em] text-[#9A7D68]">
            Privacy Policy
          </p>
  
          <h1 className="mb-6 text-3xl font-medium text-[#6A4F3D]">
            Your privacy matters here
          </h1>
  
          <div className="space-y-5 text-[16px] leading-8 text-[#705847]">
            <p>
              WithinYou is built around personal reflection. We understand that
              what you write may be sensitive, private, and meaningful. We treat
              that responsibility seriously.
            </p>
  
            <p>
              We aim to collect only the minimum information needed to operate the
              service well, securely, and reliably.
            </p>
          </div>
  
          <div className="mt-10 rounded-2xl border border-[#E8D9CC] bg-[#FFFDFC] px-5 py-5">
            <p className="mb-3 text-sm uppercase tracking-[0.08em] text-[#9A7D68]">
              Summary
            </p>
  
            <ul className="space-y-3 text-[15px] leading-7 text-[#705847]">
              <li>• We collect only limited data needed to run the app.</li>
              <li>• We never sell your personal data.</li>
              <li>
                • Your reflections are personal, and we do our best to keep them
                private and protected.
              </li>
              <li>
                • Data is stored using trusted infrastructure providers, including
                European data hosting where available.
              </li>
              <li>
                • You can update your settings, delete reflections, or delete your
                account from your profile section.
              </li>
              <li>
                • If we introduce new features such as payments or AI tools, this
                page will be updated clearly.
              </li>
            </ul>
          </div>
  
          <div className="mt-10 space-y-8 text-[16px] leading-8 text-[#705847]">
            <section>
              <h2 className="text-xl font-medium text-[#6A4F3D]">
                1. What information we collect
              </h2>
  
              <ul className="mt-3 space-y-2">
                <li>• Account details such as your name and email address</li>
                <li>• Reflections, journal entries, and saved responses</li>
                <li>• Preferences such as timezone, language, and email settings</li>
                <li>• Basic technical data such as browser type and log data</li>
              </ul>
            </section>
  
            <section>
              <h2 className="text-xl font-medium text-[#6A4F3D]">
                2. Why we collect it
              </h2>
  
              <ul className="mt-3 space-y-2">
                <li>• To create and manage your account</li>
                <li>• To save your reflections and history</li>
                <li>• To send daily reflection emails if enabled</li>
                <li>• To improve reliability, security, and usability</li>
                <li>• To respond to support requests</li>
              </ul>
            </section>
  
            <section>
              <h2 className="text-xl font-medium text-[#6A4F3D]">
                3. Your reflections
              </h2>
  
              <p className="mt-3">
                Your reflections belong to you. They are personal content created
                by you inside the app. We recognize their sensitivity and aim to
                handle them carefully and respectfully.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-medium text-[#6A4F3D]">
                4. Data sharing
              </h2>
  
              <p className="mt-3">
                We do not sell your personal information.
              </p>
  
              <p className="mt-3">
                We may use trusted service providers for hosting, databases, email
                delivery, authentication, or payments when needed to operate the
                service.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-medium text-[#6A4F3D]">
                5. Data storage and protection
              </h2>
  
              <p className="mt-3">
                We use reputable infrastructure providers and reasonable technical
                safeguards to protect your information.
              </p>
  
              <p className="mt-3">
                Where available, we prefer European data hosting and privacy
                standards. No online system can guarantee absolute security, but
                protecting your data is a priority.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-medium text-[#6A4F3D]">
                6. Your choices and control
              </h2>
  
              <ul className="mt-3 space-y-2">
                <li>• Update your account information</li>
                <li>• Change email preferences</li>
                <li>• Delete individual reflections</li>
                <li>• Delete your account</li>
                <li>• Request help regarding your data</li>
              </ul>
            </section>
  
            <section>
              <h2 className="text-xl font-medium text-[#6A4F3D]">
                7. Data retention
              </h2>
  
              <p className="mt-3">
                We keep your information while your account is active or as needed
                to provide the service, unless deletion is requested or legally
                required otherwise.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-medium text-[#6A4F3D]">
                8. Changes to this policy
              </h2>
  
              <p className="mt-3">
                We may update this policy as the product evolves. Important changes
                will be reflected on this page.
              </p>
            </section>
  
            <section>
              <h2 className="text-xl font-medium text-[#6A4F3D]">
                9. Contact
              </h2>
  
              <p className="mt-3">
                If you have privacy-related questions, please contact us at:
                your@email.com
              </p>
            </section>
          </div>
        </section>
      </main>
    );
  }