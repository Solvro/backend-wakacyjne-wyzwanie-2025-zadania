-- CreateEnum
CREATE TYPE "public"."TripCategory" AS ENUM ('BUSINESS', 'VACATION', 'PERSONAL', 'CONFERENCE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."ExpenseCategory" AS ENUM ('ACCOMMODATION', 'TRANSPORT', 'FOOD', 'ENTERTAINMENT', 'SHOPPING', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."ParticipantRole" AS ENUM ('ORGANIZER', 'PARTICIPANT', 'GUEST', 'OTHER');

-- CreateTable
CREATE TABLE "public"."expenses" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "recipient" VARCHAR(100),
    "amount" INTEGER,
    "currency" VARCHAR(3),
    "value" DECIMAL(10,2),
    "left" DECIMAL(10,2),
    "category" "public"."ExpenseCategory",
    "note" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "participant_id" INTEGER NOT NULL,
    "trip_id" INTEGER NOT NULL,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."trips" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "destination" TEXT,
    "fromDate" TIMESTAMPTZ,
    "toDate" TIMESTAMPTZ,
    "departure" TEXT,
    "accommodation" TEXT,
    "travelTime" DECIMAL(10,2),
    "travelDistance" DECIMAL(10,2),
    "category" "public"."TripCategory",
    "note" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."participants" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "surname" VARCHAR(100) NOT NULL,
    "nick" VARCHAR(50),
    "email" VARCHAR(255),
    "phone" VARCHAR(20),
    "address" TEXT,
    "bankAccount" VARCHAR(50),
    "isAdult" BOOLEAN DEFAULT true,
    "birthDate" DATE,
    "birthplace" TEXT,
    "role" "public"."ParticipantRole",
    "note" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_ParticipantToTrip" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ParticipantToTrip_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ParticipantToTrip_B_index" ON "public"."_ParticipantToTrip"("B");

-- AddForeignKey
ALTER TABLE "public"."expenses" ADD CONSTRAINT "expenses_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "public"."participants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."expenses" ADD CONSTRAINT "expenses_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ParticipantToTrip" ADD CONSTRAINT "_ParticipantToTrip_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ParticipantToTrip" ADD CONSTRAINT "_ParticipantToTrip_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;
