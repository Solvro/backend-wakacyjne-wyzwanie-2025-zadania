/*
  Warnings:

  - You are about to drop the `TripParticipant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."TripParticipant" DROP CONSTRAINT "TripParticipant_participantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TripParticipant" DROP CONSTRAINT "TripParticipant_tripId_fkey";

-- DropTable
DROP TABLE "public"."TripParticipant";

-- CreateTable
CREATE TABLE "public"."_ParticipantToTrip" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ParticipantToTrip_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ParticipantToTrip_B_index" ON "public"."_ParticipantToTrip"("B");

-- AddForeignKey
ALTER TABLE "public"."_ParticipantToTrip" ADD CONSTRAINT "_ParticipantToTrip_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ParticipantToTrip" ADD CONSTRAINT "_ParticipantToTrip_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
