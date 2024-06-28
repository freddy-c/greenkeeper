-- CreateTable
CREATE TABLE "Sprayer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tankCapacity" DOUBLE PRECISION NOT NULL,
    "nozzleSpacing" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Sprayer_pkey" PRIMARY KEY ("id")
);
