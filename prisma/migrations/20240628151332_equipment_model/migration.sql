/*
  Warnings:

  - You are about to drop the column `name` on the `Sprayer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[equipmentId]` on the table `Sprayer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `equipmentId` to the `Sprayer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EquipmentType" AS ENUM ('Sprayer');

-- AlterTable
ALTER TABLE "Sprayer" DROP COLUMN "name",
ADD COLUMN     "equipmentId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "EquipmentType" NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sprayer_equipmentId_key" ON "Sprayer"("equipmentId");

-- AddForeignKey
ALTER TABLE "Sprayer" ADD CONSTRAINT "Sprayer_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
