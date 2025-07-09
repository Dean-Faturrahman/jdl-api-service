/*
  Warnings:

  - You are about to drop the `testimoni` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `testimoni`;

-- CreateTable
CREATE TABLE `testimonies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `testimony` TEXT NOT NULL,
    `author` VARCHAR(191) NULL,
    `foto_url` VARCHAR(191) NULL,
    `rating` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
