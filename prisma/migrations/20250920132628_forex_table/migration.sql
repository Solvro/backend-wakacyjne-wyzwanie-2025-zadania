-- CreateTable
CREATE TABLE "public"."ForexRate" (
    "id" SERIAL NOT NULL,
    "currencyName" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ForexRate_pkey" PRIMARY KEY ("id")
);
