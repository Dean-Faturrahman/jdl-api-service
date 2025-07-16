/*
  Warnings:

  - You are about to drop the column `heroId` on the `hero_images` table. All the data in the column will be lost.
  - You are about to drop the column `tripId` on the `testimonies` table. All the data in the column will be lost.
  - You are about to drop the column `tripId` on the `trip_facilities` table. All the data in the column will be lost.
  - You are about to drop the column `tripId` on the `trip_images` table. All the data in the column will be lost.
  - You are about to drop the column `tripId` on the `trip_itinerary_items` table. All the data in the column will be lost.
  - You are about to drop the column `tripId` on the `trip_terms` table. All the data in the column will be lost.
  - Added the required column `hero_id` to the `hero_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trip_id` to the `testimonies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trip_id` to the `trip_facilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trip_id` to the `trip_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trip_id` to the `trip_itinerary_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trip_id` to the `trip_terms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `hero_images` DROP FOREIGN KEY `hero_images_heroId_fkey`;

-- DropForeignKey
ALTER TABLE `testimonies` DROP FOREIGN KEY `testimonies_tripId_fkey`;

-- DropForeignKey
ALTER TABLE `trip_facilities` DROP FOREIGN KEY `trip_facilities_tripId_fkey`;

-- DropForeignKey
ALTER TABLE `trip_images` DROP FOREIGN KEY `trip_images_tripId_fkey`;

-- DropForeignKey
ALTER TABLE `trip_itinerary_items` DROP FOREIGN KEY `trip_itinerary_items_tripId_fkey`;

-- DropForeignKey
ALTER TABLE `trip_terms` DROP FOREIGN KEY `trip_terms_tripId_fkey`;

-- AlterTable
ALTER TABLE `hero_images` DROP COLUMN `heroId`,
    ADD COLUMN `hero_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `testimonies` DROP COLUMN `tripId`,
    ADD COLUMN `trip_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `trip_facilities` DROP COLUMN `tripId`,
    ADD COLUMN `trip_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `trip_images` DROP COLUMN `tripId`,
    ADD COLUMN `trip_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `trip_itinerary_items` DROP COLUMN `tripId`,
    ADD COLUMN `trip_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `trip_terms` DROP COLUMN `tripId`,
    ADD COLUMN `trip_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `hero_images` ADD CONSTRAINT `hero_images_hero_id_fkey` FOREIGN KEY (`hero_id`) REFERENCES `heroes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `testimonies` ADD CONSTRAINT `testimonies_trip_id_fkey` FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trip_images` ADD CONSTRAINT `trip_images_trip_id_fkey` FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trip_facilities` ADD CONSTRAINT `trip_facilities_trip_id_fkey` FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trip_itinerary_items` ADD CONSTRAINT `trip_itinerary_items_trip_id_fkey` FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trip_terms` ADD CONSTRAINT `trip_terms_trip_id_fkey` FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
