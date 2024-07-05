/*
  Warnings:

  - Added the required column `sprayerId` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "sprayerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_sprayerId_fkey" FOREIGN KEY ("sprayerId") REFERENCES "Sprayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
