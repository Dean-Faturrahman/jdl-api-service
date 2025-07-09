/*
  Warnings:

  - You are about to drop the column `foto_url` on the `testimonies` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `testimonies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `testimonies` DROP COLUMN `foto_url`,
    DROP COLUMN `rating`;
