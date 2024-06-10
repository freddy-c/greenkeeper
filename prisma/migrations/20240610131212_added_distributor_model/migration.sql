-- CreateTable
CREATE TABLE "Distributor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Distributor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DistributorToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DistributorToProduct_AB_unique" ON "_DistributorToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_DistributorToProduct_B_index" ON "_DistributorToProduct"("B");

-- AddForeignKey
ALTER TABLE "_DistributorToProduct" ADD CONSTRAINT "_DistributorToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Distributor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DistributorToProduct" ADD CONSTRAINT "_DistributorToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
