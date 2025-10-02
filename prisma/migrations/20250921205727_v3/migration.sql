-- CreateEnum
CREATE TYPE "public"."Currency" AS ENUM ('USD', 'EUR', 'SEK');

-- CreateTable
CREATE TABLE "public"."Rate" (
    "currency" "public"."Currency" NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rate_pkey" PRIMARY KEY ("currency")
);
