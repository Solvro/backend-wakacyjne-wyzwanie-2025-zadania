/*
  Warnings:

  - You are about to drop the `_ActivityToParticipant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ParticipantToTrip` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Activity" DROP CONSTRAINT "Activity_tripId_fkey";

-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_participantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ActivityToParticipant" DROP CONSTRAINT "_ActivityToParticipant_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ActivityToParticipant" DROP CONSTRAINT "_ActivityToParticipant_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ParticipantToTrip" DROP CONSTRAINT "_ParticipantToTrip_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ParticipantToTrip" DROP CONSTRAINT "_ParticipantToTrip_B_fkey";

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "participantId" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "public"."_ActivityToParticipant";

-- DropTable
DROP TABLE "public"."_ParticipantToTrip";

-- CreateTable
CREATE TABLE "public"."Currency" (
    "code" VARCHAR(3) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "currentRate" DECIMAL(10,4) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "public"."ExchangeRate" (
    "id" SERIAL NOT NULL,
    "rate" DECIMAL(10,6) NOT NULL,
    "source" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currencyId" TEXT NOT NULL,

    CONSTRAINT "ExchangeRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Payment" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "description" TEXT,
    "originalAmount" DECIMAL(10,2) NOT NULL,
    "originalCurrency" VARCHAR(3) NOT NULL,
    "amountPLN" DECIMAL(10,2) NOT NULL,
    "exchangeRate" DECIMAL(10,6) NOT NULL,
    "paymentDate" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "participantId" INTEGER,
    "tripId" INTEGER,
    "expenseId" INTEGER,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_ActivityParticipants" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ActivityParticipants_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_TripParticipants" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TripParticipants_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Currency_code_key" ON "public"."Currency"("code");

-- CreateIndex
CREATE INDEX "ExchangeRate_currencyId_idx" ON "public"."ExchangeRate"("currencyId");

-- CreateIndex
CREATE INDEX "Payment_tripId_idx" ON "public"."Payment"("tripId");

-- CreateIndex
CREATE INDEX "Payment_participantId_idx" ON "public"."Payment"("participantId");

-- CreateIndex
CREATE INDEX "Payment_expenseId_idx" ON "public"."Payment"("expenseId");

-- CreateIndex
CREATE INDEX "_ActivityParticipants_B_index" ON "public"."_ActivityParticipants"("B");

-- CreateIndex
CREATE INDEX "_TripParticipants_B_index" ON "public"."_TripParticipants"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_email_key" ON "public"."Participant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "User_participantId_idx" ON "public"."User"("participantId");

-- AddForeignKey
ALTER TABLE "public"."Activity" ADD CONSTRAINT "Activity_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "public"."Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "public"."Participant"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ExchangeRate" ADD CONSTRAINT "ExchangeRate_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "public"."Currency"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "public"."Participant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "public"."Trip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "public"."Expense"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ActivityParticipants" ADD CONSTRAINT "_ActivityParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ActivityParticipants" ADD CONSTRAINT "_ActivityParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_TripParticipants" ADD CONSTRAINT "_TripParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_TripParticipants" ADD CONSTRAINT "_TripParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
