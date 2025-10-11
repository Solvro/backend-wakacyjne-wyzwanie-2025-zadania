/*
  Warnings:

  - You are about to drop the column `currencyName` on the `ForexRate` table. All the data in the column will be lost.
  - Added the required column `currency` to the `ForexRate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ForexRate" DROP COLUMN "currencyName",
ADD COLUMN     "currency" TEXT NOT NULL;
