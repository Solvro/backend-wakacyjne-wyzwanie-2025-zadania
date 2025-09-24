-- CreateEnum
CREATE TYPE "public"."CurrencyCode" AS ENUM ('EUR', 'USD', 'GBP');

-- CreateTable
CREATE TABLE "public"."CurrencyRate" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(3) NOT NULL,
    "rate" DECIMAL(10,4) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CurrencyRate_pkey" PRIMARY KEY ("id")
);
