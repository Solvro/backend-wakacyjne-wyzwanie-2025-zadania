/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `created_at` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Expense" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Participant" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Trip" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "public"."Test";
