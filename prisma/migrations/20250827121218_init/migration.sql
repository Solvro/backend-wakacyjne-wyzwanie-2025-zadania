-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('MEMBER', 'ORGANIZER');

-- CreateEnum
CREATE TYPE "public"."ExpenseType" AS ENUM ('FOOD', 'ACTIVITY', 'ACCOMMODATION', 'TRANSPORT', 'OTHER');

-- CreateTable
CREATE TABLE "public"."Trip" (
    "trip_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "destination" VARCHAR(64) NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "budget" DECIMAL(10,2),

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("trip_id")
);

-- CreateTable
CREATE TABLE "public"."Participant" (
    "participant_id" SERIAL NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "first_name" VARCHAR(32) NOT NULL,
    "last_name" VARCHAR(32) NOT NULL,
    "role" "public"."Role" NOT NULL,
    "email" VARCHAR(64) NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("participant_id")
);

-- CreateTable
CREATE TABLE "public"."Expense" (
    "expense_id" SERIAL NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "expense_type" "public"."ExpenseType" NOT NULL,
    "expense_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cost" DECIMAL(10,2) NOT NULL,
    "description" VARCHAR(255),

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("expense_id")
);

-- AddForeignKey
ALTER TABLE "public"."Participant" ADD CONSTRAINT "Participant_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."Trip"("trip_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."Trip"("trip_id") ON DELETE RESTRICT ON UPDATE CASCADE;
