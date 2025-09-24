-- CreateTable
CREATE TABLE "public"."Payment" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "currencyId" INTEGER NOT NULL,
    "amountPLN" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "public"."Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
