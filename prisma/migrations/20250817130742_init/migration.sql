/*
  Warnings:

  - You are about to drop the column `participant_id` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `trip_id` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `trip_participant_id` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Expense" DROP CONSTRAINT "Expense_participant_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Expense" DROP CONSTRAINT "Expense_trip_id_fkey";

-- AlterTable
ALTER TABLE "public"."Expense" DROP COLUMN "participant_id",
DROP COLUMN "trip_id",
ADD COLUMN     "trip_participant_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_trip_participant_id_fkey" FOREIGN KEY ("trip_participant_id") REFERENCES "public"."Trip_participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
