/*
  Warnings:

  - You are about to drop the column `spentAt` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `tripId` on the `Expense` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Expense" DROP CONSTRAINT "Expense_tripId_fkey";

-- AlterTable
ALTER TABLE "public"."Expense" DROP COLUMN "spentAt",
DROP COLUMN "tripId",
ADD COLUMN     "paidAt" TIMESTAMP(3);
