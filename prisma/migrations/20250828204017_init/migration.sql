/*
  Warnings:

  - The values [GIFTS] on the enum `ExpenseCategory` will be removed. If these variants are still used in the database, this will fail.
  - The values [CONFERENCE] on the enum `TripCategory` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `latitude` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `longtitude` on the `Trip` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."ExpenseCategory_new" AS ENUM ('ACCOMMODATION', 'TRANSPORT', 'FOOD', 'ENTERTAINMENT', 'HEALTH', 'UTILITIES', 'SHOPPING', 'INSURANCE', 'OTHER');
ALTER TABLE "public"."Expense" ALTER COLUMN "category" TYPE "public"."ExpenseCategory_new" USING ("category"::text::"public"."ExpenseCategory_new");
ALTER TYPE "public"."ExpenseCategory" RENAME TO "ExpenseCategory_old";
ALTER TYPE "public"."ExpenseCategory_new" RENAME TO "ExpenseCategory";
DROP TYPE "public"."ExpenseCategory_old";
COMMIT;

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."ParticipantRole" ADD VALUE 'DRIVER';
ALTER TYPE "public"."ParticipantRole" ADD VALUE 'VOLUNTEER';

-- AlterEnum
BEGIN;
CREATE TYPE "public"."TripCategory_new" AS ENUM ('BUSINESS', 'VACATION', 'FAMILY', 'PERSONAL', 'WEEKEND', 'OTHER');
ALTER TABLE "public"."Trip" ALTER COLUMN "category" TYPE "public"."TripCategory_new" USING ("category"::text::"public"."TripCategory_new");
ALTER TYPE "public"."TripCategory" RENAME TO "TripCategory_old";
ALTER TYPE "public"."TripCategory_new" RENAME TO "TripCategory";
DROP TYPE "public"."TripCategory_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."Expense" ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."Participant" ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."Trip" DROP COLUMN "latitude",
DROP COLUMN "longtitude",
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;
