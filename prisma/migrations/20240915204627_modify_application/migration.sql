/*
  Warnings:

  - Added the required column `endTime` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ManagementZone" ADD COLUMN     "applicationId" TEXT;

-- AddForeignKey
ALTER TABLE "ManagementZone" ADD CONSTRAINT "ManagementZone_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;
