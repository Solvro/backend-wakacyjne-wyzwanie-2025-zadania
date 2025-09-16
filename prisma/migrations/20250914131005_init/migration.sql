-- CreateTable
CREATE TABLE "public"."CurrencyRate" (
    "id" SERIAL NOT NULL,
    "currency" CHAR(3) NOT NULL,
    "rate" DECIMAL(12,6) NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CurrencyRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Payment" (
    "id" SERIAL NOT NULL,
    "currency" CHAR(3) NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "amountPln" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);
