-- CreateEnum
CREATE TYPE "public"."TripStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "public"."trip" (
    "trip_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "status" "public"."TripStatus" NOT NULL DEFAULT 'PLANNED',

    CONSTRAINT "trip_pkey" PRIMARY KEY ("trip_id")
);

-- CreateTable
CREATE TABLE "public"."participant" (
    "participant_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "participant_pkey" PRIMARY KEY ("participant_id")
);

-- CreateTable
CREATE TABLE "public"."trip_participant" (
    "trip_id" INTEGER NOT NULL,
    "participant_id" INTEGER NOT NULL,

    CONSTRAINT "trip_participant_pkey" PRIMARY KEY ("trip_id","participant_id")
);

-- CreateTable
CREATE TABLE "public"."expense" (
    "expense_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "sum" DOUBLE PRECISION NOT NULL,
    "is_settled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "expense_pkey" PRIMARY KEY ("expense_id")
);

-- CreateTable
CREATE TABLE "public"."participant_expense" (
    "expense_id" INTEGER NOT NULL,
    "participant_id" INTEGER NOT NULL,
    "part" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "participant_expense_pkey" PRIMARY KEY ("expense_id","participant_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "participant_email_key" ON "public"."participant"("email");

-- AddForeignKey
ALTER TABLE "public"."trip_participant" ADD CONSTRAINT "trip_participant_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."trip"("trip_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trip_participant" ADD CONSTRAINT "trip_participant_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "public"."participant"("participant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."expense" ADD CONSTRAINT "expense_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."trip"("trip_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."participant_expense" ADD CONSTRAINT "participant_expense_expense_id_fkey" FOREIGN KEY ("expense_id") REFERENCES "public"."expense"("expense_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."participant_expense" ADD CONSTRAINT "participant_expense_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "public"."participant"("participant_id") ON DELETE RESTRICT ON UPDATE CASCADE;
