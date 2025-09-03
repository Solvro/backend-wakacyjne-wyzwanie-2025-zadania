/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'USER', 'COORDINATOR', 'PARTICIPANT');

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "role",
ADD COLUMN     "role" "public"."Role";
