/*
  Warnings:

  - Added the required column `created_by_user_id` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'USER', 'COORDINATOR');

-- DropIndex
DROP INDEX "public"."Participant_email_key";

-- AlterTable
ALTER TABLE "public"."Participant" ADD COLUMN     "created_by_user_id" INTEGER NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."User" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL,
    "name" TEXT,
    "about_me" TEXT,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."Currency" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "rate" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_code_key" ON "public"."Currency"("code");

-- AddForeignKey
ALTER TABLE "public"."Participant" ADD CONSTRAINT "Participant_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
