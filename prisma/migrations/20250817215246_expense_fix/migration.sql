/*
  Warnings:

  - Added the required column `trip_id` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Expense" ADD COLUMN     "trip_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
