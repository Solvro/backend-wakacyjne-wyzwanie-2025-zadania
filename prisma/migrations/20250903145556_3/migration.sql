/*
  Warnings:

  - You are about to drop the column `user_id` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Participant` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - Added the required column `user_email` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_email` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'USER', 'TRIP_COORDINATOR');

-- DropForeignKey
ALTER TABLE "public"."Expense" DROP CONSTRAINT "Expense_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Participant" DROP CONSTRAINT "Participant_user_id_fkey";

-- DropIndex
DROP INDEX "public"."User_email_key";

-- AlterTable
ALTER TABLE "public"."Expense" DROP COLUMN "user_id",
ADD COLUMN     "user_email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Participant" DROP COLUMN "user_id",
ADD COLUMN     "user_email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'USER',
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("email");

-- AddForeignKey
ALTER TABLE "public"."Participant" ADD CONSTRAINT "Participant_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "public"."User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "public"."User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
