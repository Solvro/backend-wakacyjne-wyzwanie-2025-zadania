/*
  Warnings:

  - Added the required column `coordinator_id` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('USER', 'COORDINATOR', 'ADMIN');

-- AlterTable
ALTER TABLE "public"."Trip" ADD COLUMN     "coordinator_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "role" "public"."UserRole" NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE "public"."Trip" ADD CONSTRAINT "Trip_coordinator_id_fkey" FOREIGN KEY ("coordinator_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
