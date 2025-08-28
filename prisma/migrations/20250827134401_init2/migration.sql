-- DropForeignKey
ALTER TABLE "public"."Expense" DROP CONSTRAINT "Expense_participant_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Expense" DROP CONSTRAINT "Expense_trip_id_fkey";

-- AlterTable
ALTER TABLE "public"."Expense" ALTER COLUMN "participant_id" DROP NOT NULL,
ALTER COLUMN "trip_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "public"."Participant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."Trip"("id") ON DELETE SET NULL ON UPDATE CASCADE;
