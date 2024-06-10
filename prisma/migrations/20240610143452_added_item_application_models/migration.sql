-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,
    "distributorId" TEXT NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "initialQuantity" DOUBLE PRECISION NOT NULL,
    "currentQuantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "operator" TEXT NOT NULL,
    "waterVolume" DOUBLE PRECISION NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "windSpeed" DOUBLE PRECISION NOT NULL,
    "observations" TEXT NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationItems" (
    "applicationId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ApplicationItems_pkey" PRIMARY KEY ("applicationId","itemId")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_distributorId_fkey" FOREIGN KEY ("distributorId") REFERENCES "Distributor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationItems" ADD CONSTRAINT "ApplicationItems_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationItems" ADD CONSTRAINT "ApplicationItems_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
