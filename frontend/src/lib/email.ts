/*import { Resend } from "resend";

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
        <p>Welcome to WithinYou.</p>
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
}*/

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
  const verifyUrl = `${getAppUrl()}/verify-email?token=${encodeURIComponent(
    token
  )}`;

  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: [email],
    subject: "Verify your email",
    html: `

      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
  <img
    src="https://www.withinyouapp.com/logo-withinyou.png"
    alt="WithinYou"
    width="72"
    style="display:block;margin-bottom:24px;"
  />
        <h2>Verify your email</h2>
        <p>Welcome to WithinYou.</p>
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

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${getAppUrl()}/reset-password?token=${encodeURIComponent(
    token
  )}`;

  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: [email],
    subject: "Reset your password",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
      <img
    src="https://www.withinyouapp.com/logo-withinyou.png"
    alt="WithinYou"
    width="72"
    style="display:block;margin-bottom:24px;"
  />
        <h2>Reset your password</h2>
        <p>You requested a password reset for WithinYou.</p>
        <p>This link expires in 1 hour.</p>
        <p>
          <a
            href="${resetUrl}"
            style="display:inline-block;padding:12px 18px;background:#7A5C49;color:#ffffff;text-decoration:none;border-radius:8px;"
          >
            Reset password
          </a>
        </p>
        <p>If the button does not work, use this link:</p>
        <p>${resetUrl}</p>
        <p>If you did not request this, you can ignore this email.</p>
      </div>
    `,
  });

  if (error) {
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }
}