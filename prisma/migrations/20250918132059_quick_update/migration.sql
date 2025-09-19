/*
  Warnings:

  - You are about to drop the column `value` on the `Currency` table. All the data in the column will be lost.
  - Added the required column `rate` to the `Currency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Currency" DROP COLUMN "value",
ADD COLUMN     "rate" DOUBLE PRECISION NOT NULL;
