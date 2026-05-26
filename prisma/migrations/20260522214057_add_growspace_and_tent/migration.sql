-- CreateTable
CREATE TABLE "GrowSpace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GrowSpace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surfaceM2" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "growSpaceId" TEXT NOT NULL,

    CONSTRAINT "Tent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GrowSpace" ADD CONSTRAINT "GrowSpace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tent" ADD CONSTRAINT "Tent_growSpaceId_fkey" FOREIGN KEY ("growSpaceId") REFERENCES "GrowSpace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
