/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_ofc]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `username`,
    ADD COLUMN `email` VARCHAR(100) NOT NULL,
    ADD COLUMN `id` VARCHAR(25) NOT NULL,
    ADD COLUMN `id_ofc` VARCHAR(25) NULL,
    ADD COLUMN `is_ofc` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `oshimenId` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `members` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `call_name` VARCHAR(50) NOT NULL,
    `birth_date` VARCHAR(25) NOT NULL,
    `blood_type` VARCHAR(2) NOT NULL,
    `horoscope` VARCHAR(25) NOT NULL,
    `height` VARCHAR(5) NOT NULL,
    `twitter` VARCHAR(50) NULL,
    `instagram` VARCHAR(50) NULL,
    `tiktok` VARCHAR(50) NULL,
    `profile_img` VARCHAR(255) NOT NULL,
    `is_grad` BOOLEAN NOT NULL DEFAULT false,
    `is_regular` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `members_call_name_key`(`call_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users_email_key` ON `users`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `users_id_ofc_key` ON `users`(`id_ofc`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_oshimenId_fkey` FOREIGN KEY (`oshimenId`) REFERENCES `members`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
