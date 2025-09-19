/*
  Warnings:

  - The primary key for the `Currency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Currency` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Currency" DROP CONSTRAINT "Currency_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Currency_pkey" PRIMARY KEY ("currencyCode");
