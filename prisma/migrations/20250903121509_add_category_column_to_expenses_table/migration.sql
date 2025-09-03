/*
  Warnings:

  - Added the required column `category` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ExpenseCategory" AS ENUM ('ACCOMMODATION', 'TRANSPORT', 'FOOD', 'OTHER');

-- AlterTable
ALTER TABLE "public"."Expense" ADD COLUMN     "category" "public"."ExpenseCategory" NOT NULL;
