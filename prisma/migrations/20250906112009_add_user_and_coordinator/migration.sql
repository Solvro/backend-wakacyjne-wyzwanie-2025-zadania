/*
  Warnings:

  - The values [food,accommodation,transport,activities,other] on the enum `ExpenseCategory` will be removed. If these variants are still used in the database, this will fail.
  - The values [organizer,member] on the enum `ParticipantRole` will be removed. If these variants are still used in the database, this will fail.
  - The values [planned,ongoing,completed,cancelled] on the enum `TripStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `tripId` on the `Expense` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `Expense` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - You are about to drop the column `joined_at` on the `Participant` table. All the data in the column will be lost.
  - You are about to alter the column `share` on the `Participant` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - You are about to alter the column `budget` on the `Trip` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.

*/
-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('USER', 'ADMIN');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."ExpenseCategory_new" AS ENUM ('FOOD', 'ACCOMMODATION', 'TRANSPORT', 'ACTIVITIES', 'OTHER');
ALTER TABLE "public"."Expense" ALTER COLUMN "category" TYPE "public"."ExpenseCategory_new" USING ("category"::text::"public"."ExpenseCategory_new");
ALTER TYPE "public"."ExpenseCategory" RENAME TO "ExpenseCategory_old";
ALTER TYPE "public"."ExpenseCategory_new" RENAME TO "ExpenseCategory";
DROP TYPE "public"."ExpenseCategory_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."ParticipantRole_new" AS ENUM ('ORGANIZER', 'MEMBER', 'COORDINATOR');
ALTER TABLE "public"."Participant" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "public"."Participant" ALTER COLUMN "role" TYPE "public"."ParticipantRole_new" USING ("role"::text::"public"."ParticipantRole_new");
ALTER TYPE "public"."ParticipantRole" RENAME TO "ParticipantRole_old";
ALTER TYPE "public"."ParticipantRole_new" RENAME TO "ParticipantRole";
DROP TYPE "public"."ParticipantRole_old";
ALTER TABLE "public"."Participant" ALTER COLUMN "role" SET DEFAULT 'MEMBER';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."TripStatus_new" AS ENUM ('PLANNED', 'ONGOING', 'COMPLETED', 'CANCELLED');
ALTER TABLE "public"."Trip" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Trip" ALTER COLUMN "status" TYPE "public"."TripStatus_new" USING ("status"::text::"public"."TripStatus_new");
ALTER TYPE "public"."TripStatus" RENAME TO "TripStatus_old";
ALTER TYPE "public"."TripStatus_new" RENAME TO "TripStatus";
DROP TYPE "public"."TripStatus_old";
ALTER TABLE "public"."Trip" ALTER COLUMN "status" SET DEFAULT 'PLANNED';
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Expense" DROP CONSTRAINT "Expense_payerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Expense" DROP CONSTRAINT "Expense_tripId_fkey";

-- AlterTable
ALTER TABLE "public"."Expense" DROP COLUMN "tripId",
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "public"."Participant" DROP COLUMN "joined_at",
ADD COLUMN     "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" INTEGER,
ALTER COLUMN "role" SET DEFAULT 'MEMBER',
ALTER COLUMN "share" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "public"."Trip" ALTER COLUMN "status" SET DEFAULT 'PLANNED',
ALTER COLUMN "budget" SET DATA TYPE DECIMAL(12,2);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "Participant_tripId_idx" ON "public"."Participant"("tripId");

-- CreateIndex
CREATE INDEX "Participant_userId_idx" ON "public"."Participant"("userId");

-- AddForeignKey
ALTER TABLE "public"."Participant" ADD CONSTRAINT "Participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "public"."Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
