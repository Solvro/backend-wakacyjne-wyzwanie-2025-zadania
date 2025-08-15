/*
  Warnings:

  - Changed the type of `role` on the `Participant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('GUIDE', 'PARTICIPANT');

-- AlterTable
ALTER TABLE "public"."Participant" DROP COLUMN "role",
ADD COLUMN     "role" "public"."Role" NOT NULL;
