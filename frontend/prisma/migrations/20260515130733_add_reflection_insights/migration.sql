-- CreateTable
CREATE TABLE "reflection_insights" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'first_five',
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reflection_insights_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "reflection_insights_user_id_idx" ON "reflection_insights"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "reflection_insights_user_id_type_key" ON "reflection_insights"("user_id", "type");

-- AddForeignKey
ALTER TABLE "reflection_insights" ADD CONSTRAINT "reflection_insights_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
