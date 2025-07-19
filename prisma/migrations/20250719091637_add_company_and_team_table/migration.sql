-- CreateTable
CREATE TABLE `company_profiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company_name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `facebook_url` VARCHAR(191) NULL,
    `instagram_url` VARCHAR(191) NULL,
    `tiktok_url` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `company_profile_translations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `language_code` VARCHAR(191) NOT NULL,
    `philosophy` TEXT NULL,
    `values` TEXT NULL,
    `background` TEXT NULL,
    `vision` TEXT NULL,
    `mission` TEXT NULL,
    `profile_id` INTEGER NOT NULL,

    UNIQUE INDEX `company_profile_translations_profile_id_language_code_key`(`profile_id`, `language_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team_members` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NULL,
    `photo_url` VARCHAR(191) NULL,
    `facebook_url` VARCHAR(191) NULL,
    `instagram_url` VARCHAR(191) NULL,
    `tiktok_url` VARCHAR(191) NULL,
    `linkedin_url` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `company_profile_translations` ADD CONSTRAINT `company_profile_translations_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `company_profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
