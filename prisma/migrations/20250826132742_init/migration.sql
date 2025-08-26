-- CreateEnum
CREATE TYPE "public"."TripStatus" AS ENUM ('in_progress', 'finished', 'planned');

-- CreateEnum
CREATE TYPE "public"."ExpenseCategory" AS ENUM ('food', 'flight', 'accomodation', 'attraction', 'other');

-- CreateEnum
CREATE TYPE "public"."ParticipantRole" AS ENUM ('organizer', 'member');

-- CreateTable
CREATE TABLE "public"."Trip" (
    "id_trip" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "start_time" TIMESTAMP(3),
    "end_time" TIMESTAMP(3),
    "status" "public"."TripStatus" NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id_trip")
);

-- CreateTable
CREATE TABLE "public"."Expense" (
    "id_expense" SERIAL NOT NULL,
    "category" "public"."ExpenseCategory" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "note" TEXT,
    "id_trip" INTEGER NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id_expense")
);

-- CreateTable
CREATE TABLE "public"."Participant" (
    "id_participant" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "role" "public"."ParticipantRole" NOT NULL,
    "id_trip" INTEGER NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id_participant")
);

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_id_trip_fkey" FOREIGN KEY ("id_trip") REFERENCES "public"."Trip"("id_trip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Participant" ADD CONSTRAINT "Participant_id_trip_fkey" FOREIGN KEY ("id_trip") REFERENCES "public"."Trip"("id_trip") ON DELETE RESTRICT ON UPDATE CASCADE;
