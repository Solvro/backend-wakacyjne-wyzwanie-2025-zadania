/*
  Warnings:

  - You are about to drop the `Expense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExpenseParticipant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Participant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trip` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TripParticipant` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."expense_category" AS ENUM ('transport', 'food', 'accommodation', 'other');

-- CreateEnum
CREATE TYPE "public"."trip_status" AS ENUM ('pending', 'confirmed', 'cancelled');

-- CreateEnum
CREATE TYPE "public"."trip_type" AS ENUM ('city_break', 'adventure', 'business', 'sightseeing', 'leisure');

-- DropForeignKey
ALTER TABLE "public"."Expense" DROP CONSTRAINT "Expense_tripID_fkey";

-- DropForeignKey
ALTER TABLE "public"."ExpenseParticipant" DROP CONSTRAINT "ExpenseParticipant_expenseID_fkey";

-- DropForeignKey
ALTER TABLE "public"."ExpenseParticipant" DROP CONSTRAINT "ExpenseParticipant_parID_fkey";

-- DropForeignKey
ALTER TABLE "public"."TripParticipant" DROP CONSTRAINT "TripParticipant_parID_fkey";

-- DropForeignKey
ALTER TABLE "public"."TripParticipant" DROP CONSTRAINT "TripParticipant_tripID_fkey";

-- DropTable
DROP TABLE "public"."Expense";

-- DropTable
DROP TABLE "public"."ExpenseParticipant";

-- DropTable
DROP TABLE "public"."Participant";

-- DropTable
DROP TABLE "public"."Trip";

-- DropTable
DROP TABLE "public"."TripParticipant";

-- DropEnum
DROP TYPE "public"."ExpenseCategory";

-- DropEnum
DROP TYPE "public"."TripStatus";

-- DropEnum
DROP TYPE "public"."TripType";

-- CreateTable
CREATE TABLE "public"."trip" (
    "id_t" SERIAL NOT NULL,
    "destination" TEXT NOT NULL,
    "type" "public"."trip_type" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),

    CONSTRAINT "trip_pkey" PRIMARY KEY ("id_t")
);

-- CreateTable
CREATE TABLE "public"."participant" (
    "id_p" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "phone_num" TEXT,
    "email" TEXT,

    CONSTRAINT "participant_pkey" PRIMARY KEY ("id_p")
);

-- CreateTable
CREATE TABLE "public"."expense" (
    "id_e" SERIAL NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "category" "public"."expense_category" NOT NULL,

    CONSTRAINT "expense_pkey" PRIMARY KEY ("id_e")
);

-- CreateTable
CREATE TABLE "public"."trip_participant" (
    "trip_id" INTEGER NOT NULL,
    "par_id" INTEGER NOT NULL,
    "status" "public"."trip_status" NOT NULL,

    CONSTRAINT "trip_participant_pkey" PRIMARY KEY ("trip_id","par_id")
);

-- CreateTable
CREATE TABLE "public"."expense_participant" (
    "expense_id" INTEGER NOT NULL,
    "par_id" INTEGER NOT NULL,
    "paid" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "expense_participant_pkey" PRIMARY KEY ("expense_id","par_id")
);

-- AddForeignKey
ALTER TABLE "public"."expense" ADD CONSTRAINT "expense_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."trip"("id_t") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trip_participant" ADD CONSTRAINT "trip_participant_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."trip"("id_t") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trip_participant" ADD CONSTRAINT "trip_participant_par_id_fkey" FOREIGN KEY ("par_id") REFERENCES "public"."participant"("id_p") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."expense_participant" ADD CONSTRAINT "expense_participant_expense_id_fkey" FOREIGN KEY ("expense_id") REFERENCES "public"."expense"("id_e") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."expense_participant" ADD CONSTRAINT "expense_participant_par_id_fkey" FOREIGN KEY ("par_id") REFERENCES "public"."participant"("id_p") ON DELETE RESTRICT ON UPDATE CASCADE;
