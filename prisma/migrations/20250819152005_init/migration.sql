-- CreateEnum
CREATE TYPE "public"."trip_status" AS ENUM ('planned', 'active', 'finished', 'cancelled');

-- CreateTable
CREATE TABLE "public"."trip" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(6),
    "end_date" TIMESTAMP(6),
    "location" TEXT,
    "status" "public"."trip_status" NOT NULL,

    CONSTRAINT "trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."expense" (
    "id" SERIAL NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "amount" DECIMAL NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(6),

    CONSTRAINT "expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."participant" (
    "id" SERIAL NOT NULL,
    "trip_id" INTEGER,
    "name" TEXT NOT NULL,
    "surname" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."expense_participant" (
    "trip_id" INTEGER NOT NULL,
    "participant_id" INTEGER NOT NULL,
    "expense_id" INTEGER NOT NULL,
    "amount" DECIMAL NOT NULL,

    CONSTRAINT "expense_participant_pkey" PRIMARY KEY ("trip_id","participant_id","expense_id")
);

-- CreateIndex
CREATE INDEX "expense_index_0" ON "public"."expense"("trip_id", "id");

-- CreateIndex
CREATE UNIQUE INDEX "participant_email_key" ON "public"."participant"("email");

-- CreateIndex
CREATE INDEX "participant_index_0" ON "public"."participant"("trip_id", "name", "surname");

-- CreateIndex
CREATE INDEX "participant_index_1" ON "public"."participant"("trip_id", "email");

-- CreateIndex
CREATE INDEX "participant_index_2" ON "public"."participant"("id", "trip_id");

-- CreateIndex
CREATE INDEX "expense_participant_index_0" ON "public"."expense_participant"("trip_id", "expense_id");

-- CreateIndex
CREATE INDEX "expense_participant_index_1" ON "public"."expense_participant"("trip_id", "participant_id");

-- AddForeignKey
ALTER TABLE "public"."expense" ADD CONSTRAINT "expense_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."trip"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."participant" ADD CONSTRAINT "participant_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."trip"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."expense_participant" ADD CONSTRAINT "expense_participant_expense_id_fkey" FOREIGN KEY ("expense_id") REFERENCES "public"."expense"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."expense_participant" ADD CONSTRAINT "expense_participant_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "public"."participant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
