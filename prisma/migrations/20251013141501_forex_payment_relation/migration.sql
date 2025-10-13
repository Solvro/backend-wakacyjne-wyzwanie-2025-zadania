/*
  Warnings:

  - You are about to drop the column `exchangeRate` on the `payments` table. All the data in the column will be lost.
  - Added the required column `forexRateId` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."payments" DROP COLUMN "exchangeRate",
ADD COLUMN     "forexRateId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_forexRateId_fkey" FOREIGN KEY ("forexRateId") REFERENCES "public"."ForexRate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
