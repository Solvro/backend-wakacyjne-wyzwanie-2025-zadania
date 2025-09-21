/*
  Warnings:

  - You are about to drop the column `currencyId` on the `Expense` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Expense" DROP CONSTRAINT "Expense_currencyId_fkey";

-- AlterTable
ALTER TABLE "public"."Expense" DROP COLUMN "currencyId";
