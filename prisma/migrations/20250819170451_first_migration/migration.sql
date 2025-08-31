-- CreateEnum
CREATE TYPE "public"."TripStatus" AS ENUM ('planned', 'ongoing', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "public"."ParticipantRole" AS ENUM ('organizer', 'member');

-- CreateEnum
CREATE TYPE "public"."ExpenseCategory" AS ENUM ('food', 'accommodation', 'transport', 'activities', 'other');

-- CreateTable
CREATE TABLE "public"."Trip" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "status" "public"."TripStatus" NOT NULL DEFAULT 'planned',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "budget" DOUBLE PRECISION,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Participant" (
    "id" SERIAL NOT NULL,
    "tripId" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "role" "public"."ParticipantRole" NOT NULL DEFAULT 'member',
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "share" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Expense" (
    "id" SERIAL NOT NULL,
    "tripId" INTEGER NOT NULL,
    "payerId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "category" "public"."ExpenseCategory" NOT NULL,
    "currency" VARCHAR(3) NOT NULL,
    "paid_at" TIMESTAMP(3),

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Participant" ADD CONSTRAINT "Participant_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "public"."Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "public"."Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "public"."Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
