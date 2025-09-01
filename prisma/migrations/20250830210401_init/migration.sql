/*
  Warnings:

  - The primary key for the `Expense` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `expense_amount` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `expense_description` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `expense_id` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `trip_id` on the `Expense` table. All the data in the column will be lost.
  - The primary key for the `Participant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `first_name` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `participant_id` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `Participant` table. All the data in the column will be lost.
  - The `sex` column on the `Participant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Trip` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `end_date` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `participant_id` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `trip_id` on the `Trip` table. All the data in the column will be lost.
  - Added the required column `expenseAmount` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tripId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participantId` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Sex" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "public"."Expense" DROP CONSTRAINT "trip_constraint";

-- DropForeignKey
ALTER TABLE "public"."Trip" DROP CONSTRAINT "participant_constraint";

-- AlterTable
ALTER TABLE "public"."Expense" DROP CONSTRAINT "Expense_pkey",
DROP COLUMN "expense_amount",
DROP COLUMN "expense_description",
DROP COLUMN "expense_id",
DROP COLUMN "trip_id",
ADD COLUMN     "expenseAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "expenseDescription" TEXT,
ADD COLUMN     "expenseId" SERIAL NOT NULL,
ADD COLUMN     "tripId" INTEGER NOT NULL,
ADD CONSTRAINT "Expense_pkey" PRIMARY KEY ("expenseId");

-- AlterTable
ALTER TABLE "public"."Participant" DROP CONSTRAINT "Participant_pkey",
DROP COLUMN "first_name",
DROP COLUMN "last_name",
DROP COLUMN "participant_id",
DROP COLUMN "phone_number",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" VARCHAR(255) NOT NULL,
ADD COLUMN     "lastName" VARCHAR(255) NOT NULL,
ADD COLUMN     "participantId" SERIAL NOT NULL,
ADD COLUMN     "phoneNumber" VARCHAR(20),
DROP COLUMN "sex",
ADD COLUMN     "sex" "public"."Sex",
ADD CONSTRAINT "Participant_pkey" PRIMARY KEY ("participantId");

-- AlterTable
ALTER TABLE "public"."Trip" DROP CONSTRAINT "Trip_pkey",
DROP COLUMN "end_date",
DROP COLUMN "participant_id",
DROP COLUMN "start_date",
DROP COLUMN "trip_id",
ADD COLUMN     "endDate" TIMESTAMP(6) NOT NULL,
ADD COLUMN     "participantId" INTEGER NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(6) NOT NULL,
ADD COLUMN     "tripId" SERIAL NOT NULL,
ADD CONSTRAINT "Trip_pkey" PRIMARY KEY ("tripId");

-- DropEnum
DROP TYPE "public"."sex";

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
