/*
  Warnings:

  - Added the required column `sector` to the `Station` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Station" ADD COLUMN     "sector" TEXT NOT NULL;
