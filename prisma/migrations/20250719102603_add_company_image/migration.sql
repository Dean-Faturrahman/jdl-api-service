-- AlterTable
ALTER TABLE `company_profiles` ADD COLUMN `book_url` VARCHAR(191) NULL,
    ADD COLUMN `latitude` VARCHAR(191) NULL,
    ADD COLUMN `longitude` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `company_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `profile_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `company_images` ADD CONSTRAINT `company_images_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `company_profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
