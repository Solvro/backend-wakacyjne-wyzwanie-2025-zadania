/*
  Warnings:

  - You are about to drop the `_ParticipantToTrip` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_ParticipantToTrip" DROP CONSTRAINT "_ParticipantToTrip_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ParticipantToTrip" DROP CONSTRAINT "_ParticipantToTrip_B_fkey";

-- DropTable
DROP TABLE "public"."_ParticipantToTrip";

-- CreateTable
CREATE TABLE "public"."_TripParticipants" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TripParticipants_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TripParticipants_B_index" ON "public"."_TripParticipants"("B");

-- AddForeignKey
ALTER TABLE "public"."_TripParticipants" ADD CONSTRAINT "_TripParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_TripParticipants" ADD CONSTRAINT "_TripParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
