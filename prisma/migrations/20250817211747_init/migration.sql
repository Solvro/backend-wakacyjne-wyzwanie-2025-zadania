-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('GUIDE', 'PARTICIPANT', 'DRIVER');

-- CreateEnum
CREATE TYPE "public"."Transport" AS ENUM ('BUS', 'PLANE', 'TRAIN', 'BOAT');

-- CreateTable
CREATE TABLE "public"."Participants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "role" "public"."Role" NOT NULL,

    CONSTRAINT "Participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Trip" (
    "id" SERIAL NOT NULL,
    "destination" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "transport" "public"."Transport" NOT NULL,
    "attractions" TEXT,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cost" (
    "id" SERIAL NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "additional" DOUBLE PRECISION,

    CONSTRAINT "Cost_pkey" PRIMARY KEY ("id")
);
