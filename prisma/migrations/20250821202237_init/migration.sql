-- CreateEnum
CREATE TYPE "public"."Type" AS ENUM ('FOOD', 'TRANSPORT', 'ACCOMODATION', 'PARKING', 'OTHER');

-- CreateTable
CREATE TABLE "public"."Trip" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "destination" TEXT,
    "budget" DECIMAL(12,2),
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Participant" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TripParticipant" (
    "id" SERIAL NOT NULL,
    "participant_id" INTEGER NOT NULL,
    "trip_id" INTEGER NOT NULL,

    CONSTRAINT "TripParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Expense" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "cost" DECIMAL(12,2) NOT NULL,
    "type" "public"."Type" NOT NULL,
    "trip_id" INTEGER NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TripParticipant_participant_id_idx" ON "public"."TripParticipant"("participant_id");

-- CreateIndex
CREATE INDEX "TripParticipant_trip_id_idx" ON "public"."TripParticipant"("trip_id");

-- CreateIndex
CREATE UNIQUE INDEX "TripParticipant_trip_id_participant_id_key" ON "public"."TripParticipant"("trip_id", "participant_id");

-- CreateIndex
CREATE INDEX "Expense_trip_id_idx" ON "public"."Expense"("trip_id");

-- AddForeignKey
ALTER TABLE "public"."TripParticipant" ADD CONSTRAINT "TripParticipant_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "public"."Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TripParticipant" ADD CONSTRAINT "TripParticipant_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
