/*
  Warnings:

  - You are about to drop the column `participant_id` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the `Participant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Expense" DROP CONSTRAINT "Expense_participant_id_fkey";

-- AlterTable
ALTER TABLE "public"."Expense" DROP COLUMN "participant_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."Participant";

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
