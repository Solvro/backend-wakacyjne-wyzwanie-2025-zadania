-- CreateTable
CREATE TABLE "public"."Currency" (
    "id" SERIAL NOT NULL,
    "currencyCode" TEXT NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CurrencyRate" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currencyId" INTEGER NOT NULL,

    CONSTRAINT "CurrencyRate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Currency_currencyCode_key" ON "public"."Currency"("currencyCode");

-- AddForeignKey
ALTER TABLE "public"."CurrencyRate" ADD CONSTRAINT "CurrencyRate_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "public"."Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
