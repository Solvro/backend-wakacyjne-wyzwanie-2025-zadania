-- CreateTable
CREATE TABLE "public"."payment" (
    "id" SERIAL NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "amount" DECIMAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'PLN',
    "amount_pln" DECIMAL NOT NULL,
    "exchange_rate" DOUBLE PRECISION,
    "description" TEXT,
    "date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "payment_index_0" ON "public"."payment"("trip_id", "id");

-- CreateIndex
CREATE INDEX "payment_index_1" ON "public"."payment"("trip_id", "date");

-- AddForeignKey
ALTER TABLE "public"."payment" ADD CONSTRAINT "payment_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."trip"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
