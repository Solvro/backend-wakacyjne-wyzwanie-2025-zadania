/*
  Warnings:

  - Added the required column `currency` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "public"."Currency" ADD VALUE 'PLN';

-- AlterTable
ALTER TABLE "public"."Expense" ADD COLUMN     "currency" "public"."Currency" NOT NULL;
