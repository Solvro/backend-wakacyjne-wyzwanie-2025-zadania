/*
  Warnings:

  - Made the column `participant_id` on table `Expense` required. This step will fail if there are existing NULL values in that column.
  - Made the column `trip_id` on table `Expense` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Participant` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."AuthRole" AS ENUM ('ADMIN', 'USER');

-- DropForeignKey
ALTER TABLE "public"."Expense" DROP CONSTRAINT "Expense_participant_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Expense" DROP CONSTRAINT "Expense_trip_id_fkey";

-- AlterTable
ALTER TABLE "public"."Expense" ALTER COLUMN "participant_id" SET NOT NULL,
ALTER COLUMN "trip_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Participant" ALTER COLUMN "email" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."User" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."AuthRole" NOT NULL,
    "isEnabled" BOOLEAN NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- AddForeignKey
ALTER TABLE "public"."Participant" ADD CONSTRAINT "Participant_email_fkey" FOREIGN KEY ("email") REFERENCES "public"."User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "public"."Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
