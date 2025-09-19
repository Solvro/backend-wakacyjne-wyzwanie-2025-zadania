/*
  Warnings:

  - You are about to drop the `CurrencyRate` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Currency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Currency` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."CurrencyRate" DROP CONSTRAINT "CurrencyRate_currencyId_fkey";

-- AlterTable
ALTER TABLE "public"."Currency" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "public"."CurrencyRate";
