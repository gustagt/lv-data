-- CreateTable
CREATE TABLE "User" (
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

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_computer_key" ON "User"("computer");

-- CreateIndex
CREATE UNIQUE INDEX "User_monitor1_key" ON "User"("monitor1");

-- CreateIndex
CREATE UNIQUE INDEX "User_monitor2_key" ON "User"("monitor2");
