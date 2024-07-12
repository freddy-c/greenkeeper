/*
  Warnings:

  - Added the required column `form` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('Fertilizer', 'WettingAgent', 'Herbicide', 'Fungicide');

-- CreateEnum
CREATE TYPE "FormType" AS ENUM ('Granular', 'Liquid', 'Soluble');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "form" "FormType" NOT NULL,
ADD COLUMN     "type" "ProductType" NOT NULL;

-- CreateTable
CREATE TABLE "Fertilizer" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "nitrogen" DOUBLE PRECISION NOT NULL,
    "potassium" DOUBLE PRECISION NOT NULL,
    "phosphorus" DOUBLE PRECISION NOT NULL,
    "calcium" DOUBLE PRECISION NOT NULL,
    "magnesium" DOUBLE PRECISION NOT NULL,
    "sulfur" DOUBLE PRECISION NOT NULL,
    "iron" DOUBLE PRECISION NOT NULL,
    "manganese" DOUBLE PRECISION NOT NULL,
    "longevity" INTEGER NOT NULL,
    "turfResponse" INTEGER NOT NULL,

    CONSTRAINT "Fertilizer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WettingAgent" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "WettingAgent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weed" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Weed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Herbicide" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "maxIndividualRate" DOUBLE PRECISION NOT NULL,
    "maxNoOfApplications" INTEGER NOT NULL,

    CONSTRAINT "Herbicide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disease" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Disease_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fungicide" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Fungicide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrowthRegulator" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "GrowthRegulator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HerbicideActiveSubstance" (
    "activeSubstanceId" TEXT NOT NULL,
    "herbicideId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "HerbicideActiveSubstance_pkey" PRIMARY KEY ("activeSubstanceId","herbicideId")
);

-- CreateTable
CREATE TABLE "FungicideActiveSubstance" (
    "activeSubstanceId" TEXT NOT NULL,
    "fungicideId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "FungicideActiveSubstance_pkey" PRIMARY KEY ("activeSubstanceId","fungicideId")
);

-- CreateTable
CREATE TABLE "ActiveSubstance" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ActiveSubstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Granular" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "granuleSizeMin" DOUBLE PRECISION NOT NULL,
    "granuleSizeMax" DOUBLE PRECISION NOT NULL,
    "sgn" DOUBLE PRECISION NOT NULL,
    "minCuttingHeight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Granular_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Liquid" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "specificGravity" DOUBLE PRECISION NOT NULL,
    "waterRateMin" DOUBLE PRECISION NOT NULL,
    "waterRateMax" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Liquid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Soluble" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "waterRateMin" DOUBLE PRECISION NOT NULL,
    "waterRateMax" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Soluble_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HerbicideToWeed" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DiseaseToFungicide" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Fertilizer_productId_key" ON "Fertilizer"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "WettingAgent_productId_key" ON "WettingAgent"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Herbicide_productId_key" ON "Herbicide"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Fungicide_productId_key" ON "Fungicide"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "GrowthRegulator_productId_key" ON "GrowthRegulator"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Granular_productId_key" ON "Granular"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Liquid_productId_key" ON "Liquid"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Soluble_productId_key" ON "Soluble"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "_HerbicideToWeed_AB_unique" ON "_HerbicideToWeed"("A", "B");

-- CreateIndex
CREATE INDEX "_HerbicideToWeed_B_index" ON "_HerbicideToWeed"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DiseaseToFungicide_AB_unique" ON "_DiseaseToFungicide"("A", "B");

-- CreateIndex
CREATE INDEX "_DiseaseToFungicide_B_index" ON "_DiseaseToFungicide"("B");

-- AddForeignKey
ALTER TABLE "Fertilizer" ADD CONSTRAINT "Fertilizer_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WettingAgent" ADD CONSTRAINT "WettingAgent_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Herbicide" ADD CONSTRAINT "Herbicide_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fungicide" ADD CONSTRAINT "Fungicide_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrowthRegulator" ADD CONSTRAINT "GrowthRegulator_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HerbicideActiveSubstance" ADD CONSTRAINT "HerbicideActiveSubstance_activeSubstanceId_fkey" FOREIGN KEY ("activeSubstanceId") REFERENCES "ActiveSubstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HerbicideActiveSubstance" ADD CONSTRAINT "HerbicideActiveSubstance_herbicideId_fkey" FOREIGN KEY ("herbicideId") REFERENCES "Herbicide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FungicideActiveSubstance" ADD CONSTRAINT "FungicideActiveSubstance_activeSubstanceId_fkey" FOREIGN KEY ("activeSubstanceId") REFERENCES "ActiveSubstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FungicideActiveSubstance" ADD CONSTRAINT "FungicideActiveSubstance_fungicideId_fkey" FOREIGN KEY ("fungicideId") REFERENCES "Fungicide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Granular" ADD CONSTRAINT "Granular_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Liquid" ADD CONSTRAINT "Liquid_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Soluble" ADD CONSTRAINT "Soluble_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HerbicideToWeed" ADD CONSTRAINT "_HerbicideToWeed_A_fkey" FOREIGN KEY ("A") REFERENCES "Herbicide"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HerbicideToWeed" ADD CONSTRAINT "_HerbicideToWeed_B_fkey" FOREIGN KEY ("B") REFERENCES "Weed"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiseaseToFungicide" ADD CONSTRAINT "_DiseaseToFungicide_A_fkey" FOREIGN KEY ("A") REFERENCES "Disease"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiseaseToFungicide" ADD CONSTRAINT "_DiseaseToFungicide_B_fkey" FOREIGN KEY ("B") REFERENCES "Fungicide"("id") ON DELETE CASCADE ON UPDATE CASCADE;
