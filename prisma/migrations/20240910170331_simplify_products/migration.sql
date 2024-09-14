/*
  Warnings:

  - The values [Fertilizer] on the enum `ProductType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `ActiveSubstance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Disease` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Fertilizer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Fungicide` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FungicideActiveSubstance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Granular` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GrowthRegulator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Herbicide` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HerbicideActiveSubstance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Liquid` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Soluble` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Weed` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WettingAgent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DiseaseToFungicide` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_HerbicideToWeed` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProductType_new" AS ENUM ('Fertiliser', 'WettingAgent', 'Herbicide', 'Fungicide', 'GrowthRegulator');
ALTER TABLE "Product" ALTER COLUMN "type" TYPE "ProductType_new" USING ("type"::text::"ProductType_new");
ALTER TYPE "ProductType" RENAME TO "ProductType_old";
ALTER TYPE "ProductType_new" RENAME TO "ProductType";
DROP TYPE "ProductType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Fertilizer" DROP CONSTRAINT "Fertilizer_productId_fkey";

-- DropForeignKey
ALTER TABLE "Fungicide" DROP CONSTRAINT "Fungicide_productId_fkey";

-- DropForeignKey
ALTER TABLE "FungicideActiveSubstance" DROP CONSTRAINT "FungicideActiveSubstance_activeSubstanceId_fkey";

-- DropForeignKey
ALTER TABLE "FungicideActiveSubstance" DROP CONSTRAINT "FungicideActiveSubstance_fungicideId_fkey";

-- DropForeignKey
ALTER TABLE "Granular" DROP CONSTRAINT "Granular_productId_fkey";

-- DropForeignKey
ALTER TABLE "GrowthRegulator" DROP CONSTRAINT "GrowthRegulator_productId_fkey";

-- DropForeignKey
ALTER TABLE "Herbicide" DROP CONSTRAINT "Herbicide_productId_fkey";

-- DropForeignKey
ALTER TABLE "HerbicideActiveSubstance" DROP CONSTRAINT "HerbicideActiveSubstance_activeSubstanceId_fkey";

-- DropForeignKey
ALTER TABLE "HerbicideActiveSubstance" DROP CONSTRAINT "HerbicideActiveSubstance_herbicideId_fkey";

-- DropForeignKey
ALTER TABLE "Liquid" DROP CONSTRAINT "Liquid_productId_fkey";

-- DropForeignKey
ALTER TABLE "Soluble" DROP CONSTRAINT "Soluble_productId_fkey";

-- DropForeignKey
ALTER TABLE "WettingAgent" DROP CONSTRAINT "WettingAgent_productId_fkey";

-- DropForeignKey
ALTER TABLE "_DiseaseToFungicide" DROP CONSTRAINT "_DiseaseToFungicide_A_fkey";

-- DropForeignKey
ALTER TABLE "_DiseaseToFungicide" DROP CONSTRAINT "_DiseaseToFungicide_B_fkey";

-- DropForeignKey
ALTER TABLE "_HerbicideToWeed" DROP CONSTRAINT "_HerbicideToWeed_A_fkey";

-- DropForeignKey
ALTER TABLE "_HerbicideToWeed" DROP CONSTRAINT "_HerbicideToWeed_B_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "calcium" DOUBLE PRECISION,
ADD COLUMN     "iron" DOUBLE PRECISION,
ADD COLUMN     "magnesium" DOUBLE PRECISION,
ADD COLUMN     "manganese" DOUBLE PRECISION,
ADD COLUMN     "nitrogen" DOUBLE PRECISION,
ADD COLUMN     "phosphorus" DOUBLE PRECISION,
ADD COLUMN     "potassium" DOUBLE PRECISION,
ADD COLUMN     "specificGravity" DOUBLE PRECISION,
ADD COLUMN     "sulfur" DOUBLE PRECISION;

-- DropTable
DROP TABLE "ActiveSubstance";

-- DropTable
DROP TABLE "Disease";

-- DropTable
DROP TABLE "Fertilizer";

-- DropTable
DROP TABLE "Fungicide";

-- DropTable
DROP TABLE "FungicideActiveSubstance";

-- DropTable
DROP TABLE "Granular";

-- DropTable
DROP TABLE "GrowthRegulator";

-- DropTable
DROP TABLE "Herbicide";

-- DropTable
DROP TABLE "HerbicideActiveSubstance";

-- DropTable
DROP TABLE "Liquid";

-- DropTable
DROP TABLE "Soluble";

-- DropTable
DROP TABLE "Weed";

-- DropTable
DROP TABLE "WettingAgent";

-- DropTable
DROP TABLE "_DiseaseToFungicide";

-- DropTable
DROP TABLE "_HerbicideToWeed";

-- CreateTable
CREATE TABLE "ManagementZone" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ManagementZone_pkey" PRIMARY KEY ("id")
);
