-- CreateEnum
CREATE TYPE "public"."AuthRole" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "public"."User" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."AuthRole" NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);
