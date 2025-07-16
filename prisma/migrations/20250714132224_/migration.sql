/*
  Warnings:

  - You are about to drop the column `info` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the `highlights` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tripId` to the `testimonies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `trips` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `testimonies` ADD COLUMN `tripId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `trip_itinerary_items` MODIFY `time` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `trips` DROP COLUMN `info`,
    DROP COLUMN `name`,
    ADD COLUMN `description` TEXT NOT NULL,
    ADD COLUMN `image_url` VARCHAR(191) NULL,
    ADD COLUMN `isHighlight` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    MODIFY `mapUrl` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `highlights`;

-- AddForeignKey
ALTER TABLE `testimonies` ADD CONSTRAINT `testimonies_tripId_fkey` FOREIGN KEY (`tripId`) REFERENCES `trips`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
