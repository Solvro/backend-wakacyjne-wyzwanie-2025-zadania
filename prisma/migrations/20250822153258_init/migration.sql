-- CreateEnum
CREATE TYPE "public"."AccountType" AS ENUM ('BASIC', 'TRIAL', 'PREMIUM');

-- CreateTable
CREATE TABLE "public"."Expense" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "value" DECIMAL(65,30) NOT NULL,
    "date" DATE NOT NULL,
    "trip_participant_id" INTEGER NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Trip" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "begin_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Participant" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "surname" VARCHAR(255) NOT NULL,
    "account_type" "public"."AccountType" NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TripParticipant" (
    "id" SERIAL NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "participant_id" INTEGER NOT NULL,

    CONSTRAINT "TripParticipant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_trip_participant_id_fkey" FOREIGN KEY ("trip_participant_id") REFERENCES "public"."TripParticipant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TripParticipant" ADD CONSTRAINT "TripParticipant_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TripParticipant" ADD CONSTRAINT "TripParticipant_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "public"."Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
