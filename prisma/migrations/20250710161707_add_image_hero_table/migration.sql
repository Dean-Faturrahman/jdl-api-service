/*
  Warnings:

  - You are about to drop the column `image_url` on the `heroes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `heroes` DROP COLUMN `image_url`;

-- CreateTable
CREATE TABLE `hero_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `heroId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `hero_images` ADD CONSTRAINT `hero_images_heroId_fkey` FOREIGN KEY (`heroId`) REFERENCES `heroes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
