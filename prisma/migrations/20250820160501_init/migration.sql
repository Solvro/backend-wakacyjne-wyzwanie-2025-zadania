-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('FOOD', 'TRANSPORT', 'ACCOMMODATION', 'OTHER');

-- CreateTable
CREATE TABLE "public"."Trip" (
    "trip_id" SERIAL NOT NULL,
    "destination" TEXT NOT NULL,
    "description" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("trip_id")
);

-- CreateTable
CREATE TABLE "public"."Participant" (
    "participant_id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("participant_id")
);

-- CreateTable
CREATE TABLE "public"."Expense" (
    "expense_id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "category" "public"."Category" NOT NULL,
    "description" TEXT,
    "trip_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("expense_id")
);

-- CreateTable
CREATE TABLE "public"."TripParticipants" (
    "trip_id" INTEGER NOT NULL,
    "participant_id" INTEGER NOT NULL,

    CONSTRAINT "TripParticipants_pkey" PRIMARY KEY ("trip_id","participant_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_email_key" ON "public"."Participant"("email");

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."Trip"("trip_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TripParticipants" ADD CONSTRAINT "TripParticipants_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."Trip"("trip_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TripParticipants" ADD CONSTRAINT "TripParticipants_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "public"."Participant"("participant_id") ON DELETE RESTRICT ON UPDATE CASCADE;
