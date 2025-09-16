-- DropForeignKey
ALTER TABLE "public"."Expense" DROP CONSTRAINT "Expense_trip_participant_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."TripParticipant" DROP CONSTRAINT "TripParticipant_participant_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."TripParticipant" DROP CONSTRAINT "TripParticipant_trip_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_trip_participant_id_fkey" FOREIGN KEY ("trip_participant_id") REFERENCES "public"."TripParticipant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TripParticipant" ADD CONSTRAINT "TripParticipant_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TripParticipant" ADD CONSTRAINT "TripParticipant_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "public"."Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
