/*
  Warnings:

  - You are about to drop the column `originalCurrency` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `currencyCode` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Payment" DROP COLUMN "originalCurrency",
ADD COLUMN     "currencyCode" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_currencyCode_fkey" FOREIGN KEY ("currencyCode") REFERENCES "public"."Currency"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
