-- AlterTable
ALTER TABLE "users" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country_code" TEXT,
ADD COLUMN     "daily_question_emails" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "daily_reflection_time" TEXT NOT NULL DEFAULT '00:00',
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'en',
ADD COLUMN     "marketing_emails" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'UTC';
