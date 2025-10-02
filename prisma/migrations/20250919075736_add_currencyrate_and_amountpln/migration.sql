/*
  Warnings:

  - Added the required column `amountPLN` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Expense" ADD COLUMN     "amountPLN" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'PLN';

-- CreateTable
CREATE TABLE "public"."CurrencyRate" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "rateToPLN" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CurrencyRate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CurrencyRate_code_key" ON "public"."CurrencyRate"("code");
