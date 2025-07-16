/*
  Warnings:

  - You are about to drop the column `mapUrl` on the `trips` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `trips` DROP COLUMN `mapUrl`,
    ADD COLUMN `discount` INTEGER NULL,
    ADD COLUMN `latitude` VARCHAR(191) NULL,
    ADD COLUMN `longitude` VARCHAR(191) NULL;
