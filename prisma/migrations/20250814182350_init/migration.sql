-- CreateEnum
CREATE TYPE "public"."ExpenseCategory" AS ENUM ('TRANSPORT', 'FOOD', 'ACCOMMODATION', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."TripStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."TripType" AS ENUM ('CITY_BREAK', 'ADVENTURE', 'BUSINESS', 'SIGHTSEEING', 'LEISURE');

-- CreateTable
CREATE TABLE "public"."Trip" (
    "idT" SERIAL NOT NULL,
    "destination" TEXT NOT NULL,
    "type" "public"."TripType" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("idT")
);

-- CreateTable
CREATE TABLE "public"."Participant" (
    "idP" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "phone_num" TEXT,
    "email" TEXT,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("idP")
);

-- CreateTable
CREATE TABLE "public"."Expense" (
    "idE" SERIAL NOT NULL,
    "tripID" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "category" "public"."ExpenseCategory" NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("idE")
);

-- CreateTable
CREATE TABLE "public"."TripParticipant" (
    "tripID" INTEGER NOT NULL,
    "parID" INTEGER NOT NULL,
    "status" "public"."TripStatus" NOT NULL,

    CONSTRAINT "TripParticipant_pkey" PRIMARY KEY ("tripID","parID")
);

-- CreateTable
CREATE TABLE "public"."ExpenseParticipant" (
    "expenseID" INTEGER NOT NULL,
    "parID" INTEGER NOT NULL,
    "paid" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ExpenseParticipant_pkey" PRIMARY KEY ("expenseID","parID")
);

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_tripID_fkey" FOREIGN KEY ("tripID") REFERENCES "public"."Trip"("idT") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TripParticipant" ADD CONSTRAINT "TripParticipant_tripID_fkey" FOREIGN KEY ("tripID") REFERENCES "public"."Trip"("idT") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TripParticipant" ADD CONSTRAINT "TripParticipant_parID_fkey" FOREIGN KEY ("parID") REFERENCES "public"."Participant"("idP") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ExpenseParticipant" ADD CONSTRAINT "ExpenseParticipant_expenseID_fkey" FOREIGN KEY ("expenseID") REFERENCES "public"."Expense"("idE") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ExpenseParticipant" ADD CONSTRAINT "ExpenseParticipant_parID_fkey" FOREIGN KEY ("parID") REFERENCES "public"."Participant"("idP") ON DELETE RESTRICT ON UPDATE CASCADE;
