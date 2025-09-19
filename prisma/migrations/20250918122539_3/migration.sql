-- CreateEnum
CREATE TYPE "public"."Currency" AS ENUM ('USD', 'EUR', 'CZK');

-- CreateTable
CREATE TABLE "public"."ExchangeRate" (
    "id" SERIAL NOT NULL,
    "currency" "public"."Currency" NOT NULL,
    "exchange_rate" DECIMAL(65,30) NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExchangeRate_pkey" PRIMARY KEY ("id")
);
