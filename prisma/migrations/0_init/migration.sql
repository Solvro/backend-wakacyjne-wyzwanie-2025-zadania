-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "public"."sex" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateTable
CREATE TABLE "public"."Trip" (
    "trip_id" BIGSERIAL NOT NULL,
    "participant_id" BIGINT NOT NULL,
    "destination" VARCHAR(255) NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL,
    "end_date" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("trip_id")
);

-- CreateTable
CREATE TABLE "public"."Expense" (
    "expense_id" BIGSERIAL NOT NULL,
    "trip_id" BIGINT NOT NULL,
    "expense_amount" DOUBLE PRECISION NOT NULL,
    "expense_description" TEXT,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("expense_id")
);

-- CreateTable
CREATE TABLE "public"."Participant" (
    "participant_id" BIGSERIAL NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "phone_number" INTEGER,
    "sex" "public"."sex",

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("participant_id")
);

-- AddForeignKey
ALTER TABLE "public"."Trip" ADD CONSTRAINT "participant_constraint" FOREIGN KEY ("participant_id") REFERENCES "public"."Participant"("participant_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "trip_constraint" FOREIGN KEY ("trip_id") REFERENCES "public"."Trip"("trip_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

