-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('GUIDE', 'PARTICIPANT');

-- AlterTable
ALTER TABLE "public"."Participant" ADD COLUMN     "userEmail" TEXT;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "isEnabled" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "public"."Participant" ADD CONSTRAINT "Participant_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "public"."User"("email") ON DELETE SET NULL ON UPDATE CASCADE;
