/*
  Warnings:

  - You are about to drop the column `type` on the `Product` table. All the data in the column will be lost.
  - Added the required column `productType` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "ProductType" ADD VALUE 'GrowthRegulator';

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "type",
ADD COLUMN     "productType" "ProductType" NOT NULL;
