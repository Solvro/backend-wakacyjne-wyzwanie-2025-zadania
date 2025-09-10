/*
  Warnings:

  - You are about to drop the column `role` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - Added the required column `TripRole` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserRole` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "public"."TripRole" AS ENUM ('MEMBER', 'ORGANIZER');

-- AlterTable
ALTER TABLE "public"."Participant" DROP COLUMN "role",
ADD COLUMN     "TripRole" "public"."TripRole" NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "role",
ADD COLUMN     "UserRole" "public"."UserRole" NOT NULL;

-- DropEnum
DROP TYPE "public"."Role";
