/*
  Warnings:

  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `currencyId` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_expenseId_fkey";

-- AlterTable
ALTER TABLE "public"."Expense" ADD COLUMN     "currencyId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."Payment";

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "public"."Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
