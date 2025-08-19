/*
  Warnings:

  - You are about to drop the column `birthDate` on the `participants` table. All the data in the column will be lost.
  - Made the column `currency` on table `expenses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isAdult` on table `participants` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."ParticipantSex" AS ENUM ('FEMALE', 'MALE');

-- AlterTable
ALTER TABLE "public"."expenses" ALTER COLUMN "currency" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."participants" DROP COLUMN "birthDate",
ADD COLUMN     "birthday" DATE,
ADD COLUMN     "sex" "public"."ParticipantSex",
ALTER COLUMN "isAdult" SET NOT NULL;
