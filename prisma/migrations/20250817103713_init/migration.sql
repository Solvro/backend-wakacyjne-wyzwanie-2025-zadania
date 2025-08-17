-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('Transport', 'Jedzenie', 'Nocleg', 'Rozrywka');

-- CreateTable
CREATE TABLE "public"."Trip" (
    "trip_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date_start" TIMESTAMP(3) NOT NULL,
    "date_end" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("trip_id")
);

-- CreateTable
CREATE TABLE "public"."Expense" (
    "expense_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" "public"."Category"[],
    "amount" DECIMAL(65,30) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "participant_id" INTEGER NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("expense_id")
);

-- CreateTable
CREATE TABLE "public"."Participant" (
    "participant_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "birthday" TIMESTAMP(3),
    "email" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("participant_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_email_key" ON "public"."Participant"("email");

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."Trip"("trip_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "public"."Participant"("participant_id") ON DELETE RESTRICT ON UPDATE CASCADE;
