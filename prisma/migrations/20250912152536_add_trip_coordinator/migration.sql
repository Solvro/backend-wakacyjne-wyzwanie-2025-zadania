/*
  Warnings:

  - Added the required column `coordinatorEmail` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "public"."AuthRole" ADD VALUE 'COORDINATOR';

-- AlterTable
ALTER TABLE "public"."Trip" ADD COLUMN     "coordinatorEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Trip" ADD CONSTRAINT "Trip_coordinatorEmail_fkey" FOREIGN KEY ("coordinatorEmail") REFERENCES "public"."User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
