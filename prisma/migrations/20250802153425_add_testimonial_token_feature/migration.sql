/*
  Warnings:

  - You are about to drop the column `trip_id` on the `testimonies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[request_id]` on the table `testimonies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'COMPLETED', 'EXPIRED');

-- DropForeignKey
ALTER TABLE "testimonies" DROP CONSTRAINT "testimonies_trip_id_fkey";

-- AlterTable
ALTER TABLE "testimonies" DROP COLUMN "trip_id",
ADD COLUMN     "request_id" INTEGER;

-- CreateTable
CREATE TABLE "testimonial_requests" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "tripId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "testimonial_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "testimonial_requests_token_key" ON "testimonial_requests"("token");

-- CreateIndex
CREATE UNIQUE INDEX "testimonies_request_id_key" ON "testimonies"("request_id");

-- AddForeignKey
ALTER TABLE "testimonies" ADD CONSTRAINT "testimonies_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "testimonial_requests"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testimonial_requests" ADD CONSTRAINT "testimonial_requests_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;
