-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "depth_level" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "can_reappear" BOOLEAN NOT NULL DEFAULT false,
    "reappear_after_days" INTEGER,
    "first_phase_allowed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_deliveries" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "delivered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3),
    "status" TEXT NOT NULL,

    CONSTRAINT "question_deliveries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "responses" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "delivery_id" INTEGER NOT NULL,
    "response_text" TEXT NOT NULL,
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "responses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "questions_category_idx" ON "questions"("category");

-- CreateIndex
CREATE INDEX "questions_depth_level_idx" ON "questions"("depth_level");

-- CreateIndex
CREATE INDEX "questions_is_active_idx" ON "questions"("is_active");

-- CreateIndex
CREATE INDEX "question_deliveries_user_id_idx" ON "question_deliveries"("user_id");

-- CreateIndex
CREATE INDEX "question_deliveries_question_id_idx" ON "question_deliveries"("question_id");

-- CreateIndex
CREATE INDEX "question_deliveries_status_idx" ON "question_deliveries"("status");

-- CreateIndex
CREATE INDEX "question_deliveries_delivered_at_idx" ON "question_deliveries"("delivered_at");

-- CreateIndex
CREATE UNIQUE INDEX "responses_delivery_id_key" ON "responses"("delivery_id");

-- CreateIndex
CREATE INDEX "responses_user_id_idx" ON "responses"("user_id");

-- CreateIndex
CREATE INDEX "responses_question_id_idx" ON "responses"("question_id");

-- CreateIndex
CREATE INDEX "responses_submitted_at_idx" ON "responses"("submitted_at");

-- AddForeignKey
ALTER TABLE "question_deliveries" ADD CONSTRAINT "question_deliveries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_deliveries" ADD CONSTRAINT "question_deliveries_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_delivery_id_fkey" FOREIGN KEY ("delivery_id") REFERENCES "question_deliveries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
