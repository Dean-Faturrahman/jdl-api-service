/*
  Warnings:

  - You are about to drop the column `description` on the `heroes` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `heroes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `heroes` DROP COLUMN `description`,
    DROP COLUMN `title`;

-- CreateTable
CREATE TABLE `hero_translations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hero_id` INTEGER NOT NULL,
    `language_code` VARCHAR(5) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `hero_translations_hero_id_language_code_key`(`hero_id`, `language_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `hero_translations` ADD CONSTRAINT `hero_translations_hero_id_fkey` FOREIGN KEY (`hero_id`) REFERENCES `heroes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
