-- CreateEnum
CREATE TYPE "public"."Currency" AS ENUM ('EUR', 'CHF', 'USD');

-- CreateTable
CREATE TABLE "public"."CurrencyExchange" (
    "currency" "public"."Currency" NOT NULL,
    "exchange" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CurrencyExchange_pkey" PRIMARY KEY ("currency")
);

-- CreateIndex
CREATE UNIQUE INDEX "CurrencyExchange_currency_key" ON "public"."CurrencyExchange"("currency");
