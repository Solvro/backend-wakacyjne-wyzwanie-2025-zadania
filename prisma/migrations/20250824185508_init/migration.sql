-- AlterTable
ALTER TABLE "public"."Expense" ALTER COLUMN "participantId" DROP NOT NULL,
ALTER COLUMN "tripId" DROP NOT NULL;
