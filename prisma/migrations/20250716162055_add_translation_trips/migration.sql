/*
  Warnings:

  - You are about to drop the column `name` on the `trip_facilities` table. All the data in the column will be lost.
  - You are about to drop the column `activity` on the `trip_itinerary_items` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `trip_terms` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `trips` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `trip_facilities` DROP COLUMN `name`;

-- AlterTable
ALTER TABLE `trip_itinerary_items` DROP COLUMN `activity`;

-- AlterTable
ALTER TABLE `trip_terms` DROP COLUMN `description`;

-- AlterTable
ALTER TABLE `trips` DROP COLUMN `description`,
    DROP COLUMN `location`,
    DROP COLUMN `title`;

-- CreateTable
CREATE TABLE `trip_translations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `language_code` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `trip_id` INTEGER NOT NULL,

    UNIQUE INDEX `trip_translations_trip_id_language_code_key`(`trip_id`, `language_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trip_facility_translations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `language_code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `facility_id` INTEGER NOT NULL,

    UNIQUE INDEX `trip_facility_translations_facility_id_language_code_key`(`facility_id`, `language_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trip_itinerary_item_translations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `language_code` VARCHAR(191) NOT NULL,
    `activity` VARCHAR(191) NOT NULL,
    `itinerary_item_id` INTEGER NOT NULL,

    UNIQUE INDEX `trip_itinerary_item_translations_itinerary_item_id_language__key`(`itinerary_item_id`, `language_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trip_term_translations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `language_code` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `term_id` INTEGER NOT NULL,

    UNIQUE INDEX `trip_term_translations_term_id_language_code_key`(`term_id`, `language_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `trip_translations` ADD CONSTRAINT `trip_translations_trip_id_fkey` FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trip_facility_translations` ADD CONSTRAINT `trip_facility_translations_facility_id_fkey` FOREIGN KEY (`facility_id`) REFERENCES `trip_facilities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trip_itinerary_item_translations` ADD CONSTRAINT `trip_itinerary_item_translations_itinerary_item_id_fkey` FOREIGN KEY (`itinerary_item_id`) REFERENCES `trip_itinerary_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trip_term_translations` ADD CONSTRAINT `trip_term_translations_term_id_fkey` FOREIGN KEY (`term_id`) REFERENCES `trip_terms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
