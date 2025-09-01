/*
  Warnings:

  - You are about to drop the column `email` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `secondname` on the `Participant` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('male', 'female');

-- DropIndex
DROP INDEX "public"."Participant_email_key";

-- AlterTable
ALTER TABLE "public"."Participant" DROP COLUMN "email",
DROP COLUMN "lastname",
DROP COLUMN "name",
DROP COLUMN "secondname",
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "gender" "public"."Gender" NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "second_name" TEXT;

-- CreateTable
CREATE TABLE "public"."Trip" (
    "id" SERIAL NOT NULL,
    "participant_id" INTEGER NOT NULL,
    "date_start" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Expense" (
    "id" SERIAL NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Trip" ADD CONSTRAINT "Trip_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "public"."Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
