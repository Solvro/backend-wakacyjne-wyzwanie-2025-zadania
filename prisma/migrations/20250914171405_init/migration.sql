/*
  Warnings:

  - You are about to drop the column `amountPln` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `amount_pln` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Payment" DROP COLUMN "amountPln",
DROP COLUMN "createdAt",
ADD COLUMN     "amount_pln" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
