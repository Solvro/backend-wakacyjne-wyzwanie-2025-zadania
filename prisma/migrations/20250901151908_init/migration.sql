-- CreateEnum
CREATE TYPE "public"."Sex" AS ENUM ('MALE', 'FEMALE', 'OTHER');

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

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "trip_constraint" FOREIGN KEY ("tripId") REFERENCES "public"."Trip"("tripId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Trip" ADD CONSTRAINT "participant_constraint" FOREIGN KEY ("participantId") REFERENCES "public"."Participant"("participantId") ON DELETE NO ACTION ON UPDATE NO ACTION;
