-- CreateTable
CREATE TABLE "question_stats" (
    "question_id" INTEGER NOT NULL,
    "delivered_count" INTEGER NOT NULL DEFAULT 0,
    "answered_count" INTEGER NOT NULL DEFAULT 0,
    "response_deleted_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "question_stats_pkey" PRIMARY KEY ("question_id")
);

-- AddForeignKey
ALTER TABLE "question_stats" ADD CONSTRAINT "question_stats_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
