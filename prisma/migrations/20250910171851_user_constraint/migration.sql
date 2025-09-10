/*
  Warnings:

  - You are about to alter the column `email` on the `Participant` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- DropForeignKey
ALTER TABLE "public"."Participant" DROP CONSTRAINT "Participant_email_fkey";

-- AlterTable
ALTER TABLE "public"."Participant" ALTER COLUMN "email" SET DATA TYPE VARCHAR(255);

-- AddForeignKey
ALTER TABLE "public"."Participant" ADD CONSTRAINT "Participant_email_fkey" FOREIGN KEY ("email") REFERENCES "public"."User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
