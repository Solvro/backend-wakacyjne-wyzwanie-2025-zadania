-- CreateEnum
CREATE TYPE "public"."Sex" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "public"."Expense" (
    "expenseId" SERIAL NOT NULL,
    "tripId" INTEGER NOT NULL,
    "expenseAmount" DOUBLE PRECISION NOT NULL,
    "expenseDescription" TEXT,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("expenseId")
);

-- CreateTable
CREATE TABLE "public"."Participant" (
    "participantId" SERIAL NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(20),
    "email" TEXT NOT NULL,
    "sex" "public"."Sex",

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("participantId")
);

-- CreateTable
CREATE TABLE "public"."Trip" (
    "tripId" SERIAL NOT NULL,
    "participantId" INTEGER NOT NULL,
    "destination" VARCHAR(255) NOT NULL,
    "startDate" TIMESTAMP(6) NOT NULL,
    "endDate" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("tripId")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "email" TEXT NOT NULL,
    "aboutMe" TEXT,
    "password" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL,
    "isEnabled" BOOLEAN NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "trip_constraint" FOREIGN KEY ("tripId") REFERENCES "public"."Trip"("tripId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Participant" ADD CONSTRAINT "Participant_email_fkey" FOREIGN KEY ("email") REFERENCES "public"."User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Trip" ADD CONSTRAINT "participant_constraint" FOREIGN KEY ("participantId") REFERENCES "public"."Participant"("participantId") ON DELETE NO ACTION ON UPDATE NO ACTION;
