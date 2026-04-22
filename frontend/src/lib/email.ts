import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function getAppUrl() {
  const appUrl = process.env.APP_URL;
  if (!appUrl) {
    throw new Error("APP_URL is not set.");
  }
  return appUrl;
}

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${getAppUrl()}/verify-email?token=${encodeURIComponent(token)}`;

  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: [email],
    subject: "Verify your email",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
        <h2>Verify your email</h2>
        <p>Welcome to Self Reflection.</p>
        <p>Please verify your email before writing and saving reflections.</p>
        <p>
          <a
            href="${verifyUrl}"
            style="display:inline-block;padding:12px 18px;background:#7A5C49;color:#ffffff;text-decoration:none;border-radius:8px;"
          >
            Verify email
          </a>
        </p>
        <p>If the button does not work, use this link:</p>
        <p>${verifyUrl}</p>
        <p>This link expires in 24 hours.</p>
      </div>
    `,
  });

  if (error) {
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
}