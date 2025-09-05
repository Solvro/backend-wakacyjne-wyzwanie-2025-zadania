/*
  Warnings:

  - You are about to drop the column `recipientBankAccount` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `bankAccount` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `birthday` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `birthplace` on the `Participant` table. All the data in the column will be lost.
  - You are about to alter the column `latitude` on the `Trip` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,5)` to `Decimal(10,6)`.
  - You are about to alter the column `longtitude` on the `Trip` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,5)` to `Decimal(10,6)`.

*/
-- AlterTable
ALTER TABLE "public"."Expense" DROP COLUMN "recipientBankAccount",
DROP COLUMN "value",
ADD COLUMN     "amount" DECIMAL(10,2),
ADD COLUMN     "recipientIban" VARCHAR(50);

-- AlterTable
ALTER TABLE "public"."Participant" DROP COLUMN "bankAccount",
DROP COLUMN "birthday",
DROP COLUMN "birthplace",
ADD COLUMN     "dateOfBirth" DATE,
ADD COLUMN     "iban" VARCHAR(50),
ADD COLUMN     "placeOfBirth" TEXT;

-- AlterTable
ALTER TABLE "public"."Trip" ALTER COLUMN "latitude" SET DATA TYPE DECIMAL(10,6),
ALTER COLUMN "longtitude" SET DATA TYPE DECIMAL(10,6);
