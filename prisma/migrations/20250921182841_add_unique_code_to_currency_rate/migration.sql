/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `CurrencyRate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CurrencyRate_code_key" ON "public"."CurrencyRate"("code");
