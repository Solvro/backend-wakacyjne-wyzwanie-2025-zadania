/*
  Warnings:

  - The values [RELAXATION] on the enum `ActivityCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."ActivityCategory_new" AS ENUM ('SIGHTSEEING', 'LEISURE', 'CULTURE', 'NATURE', 'SPORTS', 'ENTERTAINMENT', 'MEDIA', 'OTHER');
ALTER TABLE "public"."Activity" ALTER COLUMN "category" TYPE "public"."ActivityCategory_new" USING ("category"::text::"public"."ActivityCategory_new");
ALTER TYPE "public"."ActivityCategory" RENAME TO "ActivityCategory_old";
ALTER TYPE "public"."ActivityCategory_new" RENAME TO "ActivityCategory";
DROP TYPE "public"."ActivityCategory_old";
COMMIT;

-- AlterEnum
ALTER TYPE "public"."ParticipantRole" ADD VALUE 'GUIDE';

-- AlterEnum
ALTER TYPE "public"."TripCategory" ADD VALUE 'LEISURE';
