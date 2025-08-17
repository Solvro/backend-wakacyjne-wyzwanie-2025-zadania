-- CreateTable
CREATE TABLE "public"."TripParticipant" (
    "id" SERIAL NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "participant_id" INTEGER NOT NULL,

    CONSTRAINT "TripParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TripParticipant_trip_id_participant_id_key" ON "public"."TripParticipant"("trip_id", "participant_id");

-- AddForeignKey
ALTER TABLE "public"."TripParticipant" ADD CONSTRAINT "TripParticipant_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."Trip"("trip_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TripParticipant" ADD CONSTRAINT "TripParticipant_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "public"."Participant"("participant_id") ON DELETE RESTRICT ON UPDATE CASCADE;
