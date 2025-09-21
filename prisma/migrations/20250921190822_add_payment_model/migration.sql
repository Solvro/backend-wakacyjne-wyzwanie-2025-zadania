-- CreateTable
CREATE TABLE "public"."Payment" (
    "id" SERIAL NOT NULL,
    "originalAmount" DECIMAL(10,2) NOT NULL,
    "originalCurrency" VARCHAR(3) NOT NULL,
    "amountInPLN" DECIMAL(10,2) NOT NULL,
    "exchangeRate" DECIMAL(10,4) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" VARCHAR(255),

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);
