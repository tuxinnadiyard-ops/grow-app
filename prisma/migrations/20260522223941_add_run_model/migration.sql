-- CreateEnum
CREATE TYPE "RunStage" AS ENUM ('VEG', 'FLOWER', 'DRY', 'CURE');

-- CreateTable
CREATE TABLE "Run" (
    "id" TEXT NOT NULL,
    "strain" TEXT NOT NULL,
    "stage" "RunStage" NOT NULL DEFAULT 'VEG',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tentId" TEXT NOT NULL,

    CONSTRAINT "Run_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Run" ADD CONSTRAINT "Run_tentId_fkey" FOREIGN KEY ("tentId") REFERENCES "Tent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
