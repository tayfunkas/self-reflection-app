import crypto from "crypto";
import prisma from "@/lib/prisma";

const PASSWORD_RESET_PREFIX = "password-reset:";

export function getPasswordResetIdentifier(email: string) {
  return `${PASSWORD_RESET_PREFIX}${email}`;
}

export function getEmailFromPasswordResetIdentifier(identifier: string) {
  return identifier.replace(PASSWORD_RESET_PREFIX, "");
}

export function isPasswordResetIdentifier(identifier: string) {
  return identifier.startsWith(PASSWORD_RESET_PREFIX);
}

export async function createPasswordResetToken(email: string) {
  const identifier = getPasswordResetIdentifier(email);

  await prisma.verificationToken.deleteMany({
    where: { identifier },
  });

  const token = crypto.randomBytes(32).toString("hex");

  return prisma.verificationToken.create({
    data: {
      identifier,
      token,
      expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
    },
  });
}