/*
  Warnings:

  - You are about to alter the column `price` on the `Expense` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "public"."Expense" ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);
