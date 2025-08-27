/*
  Warnings:

  - You are about to drop the column `trip_id` on the `Participant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Participant" DROP CONSTRAINT "Participant_trip_id_fkey";

-- AlterTable
ALTER TABLE "public"."Participant" DROP COLUMN "trip_id";

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
