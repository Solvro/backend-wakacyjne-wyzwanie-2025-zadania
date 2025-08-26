/*
  Warnings:

  - You are about to drop the column `participant_id` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `birthday` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Participant` table. All the data in the column will be lost.
  - Added the required column `person_id` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `person_id` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Expense" DROP CONSTRAINT "Expense_participant_id_fkey";

-- AlterTable
ALTER TABLE "public"."Expense" DROP COLUMN "participant_id",
ADD COLUMN     "person_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Participant" DROP COLUMN "birthday",
DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "person_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."Person" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "birthday" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "public"."Person"("email");

-- AddForeignKey
ALTER TABLE "public"."Participant" ADD CONSTRAINT "Participant_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "public"."Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "public"."Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
