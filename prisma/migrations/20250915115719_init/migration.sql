-- CreateEnum
CREATE TYPE "public"."TripCategory" AS ENUM ('BUSINESS', 'VACATION', 'FAMILY', 'PERSONAL', 'WEEKEND', 'LEISURE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."ExpenseCategory" AS ENUM ('ACCOMMODATION', 'TRANSPORT', 'FOOD', 'HEALTH', 'ENTERTAINMENT', 'GIFT', 'UTILITIES', 'SHOPPING', 'INSURANCE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."ParticipantRole" AS ENUM ('ORGANIZER', 'PARTICIPANT', 'GUEST', 'DRIVER', 'VOLUNTEER', 'GUIDE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."ParticipantSex" AS ENUM ('FEMALE', 'MALE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."ActivityCategory" AS ENUM ('SIGHTSEEING', 'LEISURE', 'CULTURE', 'NATURE', 'SPORTS', 'ENTERTAINMENT', 'MEDIA', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'USER', 'TRIPCOORD', 'GUEST', 'OTHER');

-- CreateTable
CREATE TABLE "public"."Activity" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "place" TEXT,
    "startDate" TIMESTAMPTZ,
    "endDate" TIMESTAMPTZ,
    "category" "public"."ActivityCategory" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "tripId" INTEGER,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Expense" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "recipientName" VARCHAR(100),
    "recipientIban" VARCHAR(50),
    "quantity" INTEGER DEFAULT 1,
    "currency" VARCHAR(3) NOT NULL DEFAULT 'PLN',
    "amount" DECIMAL(10,2),
    "budgetLeft" DECIMAL(10,2),
    "category" "public"."ExpenseCategory" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "participantId" INTEGER,
    "tripId" INTEGER,
    "activityId" INTEGER,

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
    "accommodation" TEXT,
    "travelTime" DECIMAL(10,2),
    "travelDistance" DECIMAL(10,2),
    "category" "public"."TripCategory" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Participant" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "surname" VARCHAR(100) NOT NULL,
    "email" VARCHAR(200),
    "phone" VARCHAR(25),
    "address" TEXT,
    "iban" VARCHAR(50),
    "isAdult" BOOLEAN NOT NULL DEFAULT true,
    "dateOfBirth" DATE,
    "placeOfBirth" TEXT,
    "sex" "public"."ParticipantSex" NOT NULL,
    "role" "public"."ParticipantRole" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "email" VARCHAR(200) NOT NULL,
    "username" VARCHAR(100),
    "password" VARCHAR(255) NOT NULL,
    "role" "public"."Role" NOT NULL,
    "note" TEXT,
    "lastLogin" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "participantId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "public"."_ActivityToParticipant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ActivityToParticipant_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_ParticipantToTrip" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ParticipantToTrip_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "Expense_tripId_idx" ON "public"."Expense"("tripId");

-- CreateIndex
CREATE INDEX "Expense_participantId_idx" ON "public"."Expense"("participantId");

-- CreateIndex
CREATE INDEX "Expense_activityId_idx" ON "public"."Expense"("activityId");

-- CreateIndex
CREATE INDEX "_ActivityToParticipant_B_index" ON "public"."_ActivityToParticipant"("B");

-- CreateIndex
CREATE INDEX "_ParticipantToTrip_B_index" ON "public"."_ParticipantToTrip"("B");

-- AddForeignKey
ALTER TABLE "public"."Activity" ADD CONSTRAINT "Activity_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "public"."Trip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "public"."Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "public"."Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "public"."Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "public"."Participant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ActivityToParticipant" ADD CONSTRAINT "_ActivityToParticipant_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ActivityToParticipant" ADD CONSTRAINT "_ActivityToParticipant_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ParticipantToTrip" ADD CONSTRAINT "_ParticipantToTrip_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ParticipantToTrip" ADD CONSTRAINT "_ParticipantToTrip_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
