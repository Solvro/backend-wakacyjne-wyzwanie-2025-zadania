/*
  Warnings:

  - You are about to drop the column `person_id` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `person_id` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the `Person` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Expense" DROP CONSTRAINT "Expense_person_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Participant" DROP CONSTRAINT "Participant_person_id_fkey";

-- AlterTable
ALTER TABLE "public"."Expense" DROP COLUMN "person_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Participant" DROP COLUMN "person_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."Person";

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "birthday" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Participant" ADD CONSTRAINT "Participant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
