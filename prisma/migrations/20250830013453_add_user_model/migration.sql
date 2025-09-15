/*
  Warnings:

  - You are about to drop the column `userId` on the `Participant` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Participant" DROP CONSTRAINT "Participant_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Participant" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT;

-- AlterTable
ALTER TABLE "public"."User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("email");

-- AddForeignKey
ALTER TABLE "public"."Participant" ADD CONSTRAINT "Participant_email_fkey" FOREIGN KEY ("email") REFERENCES "public"."User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
