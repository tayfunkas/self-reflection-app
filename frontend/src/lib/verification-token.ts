import crypto from "crypto";
import prisma from "@/lib/prisma";

const EMAIL_VERIFICATION_TOKEN_EXPIRY_HOURS = 24;

export async function createEmailVerificationToken(email: string) {
  await prisma.verificationToken.deleteMany({
    where: { identifier: email },
  });

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(
    Date.now() + EMAIL_VERIFICATION_TOKEN_EXPIRY_HOURS * 60 * 60 * 1000
  );

  const verificationToken = await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  return verificationToken;
}

export async function consumeEmailVerificationToken(token: string) {
  const existingToken = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!existingToken) {
    return { success: false, reason: "invalid" as const };
  }

  if (existingToken.expires < new Date()) {
    await prisma.verificationToken.delete({
      where: { token },
    });

    return { success: false, reason: "expired" as const };
  }

  await prisma.user.update({
    where: { email: existingToken.identifier },
    data: { emailVerified: new Date() },
  });

  await prisma.verificationToken.delete({
    where: { token },
  });

  return { success: true as const };
}