-- CreateTable
CREATE TABLE "public"."CurrencyRate" (
    "symbol" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "buy" DECIMAL(65,30) NOT NULL,
    "sell" DECIMAL(65,30) NOT NULL,
    "average" DECIMAL(65,30) NOT NULL,
    "update_time" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CurrencyRate_pkey" PRIMARY KEY ("symbol")
);
