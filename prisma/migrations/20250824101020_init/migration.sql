/*
  Warnings:

  - Made the column `category` on table `Expense` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sex` on table `Participant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `Participant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category` on table `Trip` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Expense" ALTER COLUMN "category" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Participant" ALTER COLUMN "sex" SET NOT NULL,
ALTER COLUMN "role" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Trip" ALTER COLUMN "category" SET NOT NULL;
