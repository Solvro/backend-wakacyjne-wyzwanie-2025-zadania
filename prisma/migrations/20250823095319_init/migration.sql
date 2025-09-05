/*
  Warnings:

  - You are about to drop the `expenses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `participants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trips` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."ExpenseCategory" ADD VALUE 'HEALTH';
ALTER TYPE "public"."ExpenseCategory" ADD VALUE 'GIFTS';
ALTER TYPE "public"."ExpenseCategory" ADD VALUE 'UTILITIES';
ALTER TYPE "public"."ExpenseCategory" ADD VALUE 'INSURANCE';

-- AlterEnum
ALTER TYPE "public"."ParticipantSex" ADD VALUE 'OTHER';

-- AlterEnum
ALTER TYPE "public"."TripCategory" ADD VALUE 'FAMILY';

-- DropForeignKey
ALTER TABLE "public"."_ParticipantToTrip" DROP CONSTRAINT "_ParticipantToTrip_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ParticipantToTrip" DROP CONSTRAINT "_ParticipantToTrip_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."expenses" DROP CONSTRAINT "expenses_participant_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."expenses" DROP CONSTRAINT "expenses_trip_id_fkey";

-- DropTable
DROP TABLE "public"."expenses";

-- DropTable
DROP TABLE "public"."participants";

-- DropTable
DROP TABLE "public"."trips";

-- CreateTable
CREATE TABLE "public"."Expense" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "recipientName" VARCHAR(100),
    "recipientBankAccount" VARCHAR(50),
    "quantity" INTEGER DEFAULT 1,
    "currency" VARCHAR(3) NOT NULL DEFAULT 'PLN',
    "value" DECIMAL(10,2),
    "budgetLeft" DECIMAL(10,2),
    "category" "public"."ExpenseCategory",
    "note" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "participantId" INTEGER NOT NULL,
    "tripId" INTEGER NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Trip" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "destination" TEXT,
    "budget" DECIMAL(10,2),
    "startDate" TIMESTAMPTZ,
    "endDate" TIMESTAMPTZ,
    "departure" TEXT,
    "accommodation" TEXT,
    "travelTime" DECIMAL(10,2),
    "travelDistance" DECIMAL(10,2),
    "latitude" DECIMAL(10,5),
    "longtitude" DECIMAL(10,5),
    "category" "public"."TripCategory",
    "note" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Participant" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "surname" VARCHAR(100) NOT NULL,
    "nick" VARCHAR(50),
    "email" VARCHAR(200),
    "phone" VARCHAR(25),
    "address" TEXT,
    "bankAccount" VARCHAR(50),
    "isAdult" BOOLEAN NOT NULL DEFAULT true,
    "birthday" DATE,
    "birthplace" TEXT,
    "sex" "public"."ParticipantSex",
    "role" "public"."ParticipantRole",
    "note" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "public"."Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "public"."Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ParticipantToTrip" ADD CONSTRAINT "_ParticipantToTrip_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ParticipantToTrip" ADD CONSTRAINT "_ParticipantToTrip_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
