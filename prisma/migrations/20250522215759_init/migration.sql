/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Station" (
    "id" SERIAL NOT NULL,
    "computer" TEXT NOT NULL,
    "processor" TEXT NOT NULL,
    "monitor1" TEXT NOT NULL,
    "pol1" TEXT NOT NULL,
    "monitor2" TEXT,
    "pol2" TEXT,
    "responsible" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userCreated" TEXT NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Station_computer_key" ON "Station"("computer");

-- CreateIndex
CREATE UNIQUE INDEX "Station_monitor1_key" ON "Station"("monitor1");

-- CreateIndex
CREATE UNIQUE INDEX "Station_monitor2_key" ON "Station"("monitor2");
