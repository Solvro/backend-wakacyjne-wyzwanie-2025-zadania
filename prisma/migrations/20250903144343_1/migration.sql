/*
  Warnings:

  - Added the required column `role` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'COORDINATOR', 'ADMIN');

-- AlterTable
ALTER TABLE "public"."Participant" ADD COLUMN     "role" "public"."Role" NOT NULL;
