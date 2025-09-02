/*
  Warnings:

  - Made the column `Trip_id` on table `Expense` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Participant_id` on table `Expense` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Name` on table `Participant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Trip_id` on table `Participant` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Expense" DROP CONSTRAINT "Expense_Participant_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Expense" DROP CONSTRAINT "Expense_Trip_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Participant" DROP CONSTRAINT "Participant_Trip_id_fkey";

-- AlterTable
ALTER TABLE "public"."Expense" ALTER COLUMN "Description" DROP NOT NULL,
ALTER COLUMN "Trip_id" SET NOT NULL,
ALTER COLUMN "Participant_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Participant" ALTER COLUMN "Name" SET NOT NULL,
ALTER COLUMN "Email" DROP NOT NULL,
ALTER COLUMN "Trip_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Trip" ALTER COLUMN "Description" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Participant" ADD CONSTRAINT "Participant_Trip_id_fkey" FOREIGN KEY ("Trip_id") REFERENCES "public"."Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_Trip_id_fkey" FOREIGN KEY ("Trip_id") REFERENCES "public"."Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_Participant_id_fkey" FOREIGN KEY ("Participant_id") REFERENCES "public"."Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
