/*
  Warnings:

  - Added the required column `method` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `area` to the `ManagementZone` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ApplicationMethod" AS ENUM ('Broadcast', 'Spray');

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_sprayerId_fkey";

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "method" "ApplicationMethod" NOT NULL,
ALTER COLUMN "waterVolume" DROP NOT NULL,
ALTER COLUMN "sprayerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ManagementZone" ADD COLUMN     "area" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_sprayerId_fkey" FOREIGN KEY ("sprayerId") REFERENCES "Sprayer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
