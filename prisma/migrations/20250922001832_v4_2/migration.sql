/*
  Warnings:

  - You are about to drop the column `amointPLN` on the `Payments` table. All the data in the column will be lost.
  - Added the required column `amountPLN` to the `Payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Payments" DROP COLUMN "amointPLN",
ADD COLUMN     "amountPLN" DOUBLE PRECISION NOT NULL;
