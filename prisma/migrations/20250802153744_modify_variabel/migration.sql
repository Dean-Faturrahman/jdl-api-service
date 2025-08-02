/*
  Warnings:

  - You are about to drop the column `tripId` on the `testimonial_requests` table. All the data in the column will be lost.
  - Added the required column `trip_id` to the `testimonial_requests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "testimonial_requests" DROP CONSTRAINT "testimonial_requests_tripId_fkey";

-- AlterTable
ALTER TABLE "testimonial_requests" DROP COLUMN "tripId",
ADD COLUMN     "trip_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "testimonial_requests" ADD CONSTRAINT "testimonial_requests_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;
