/*
  Warnings:

  - You are about to drop the column `isHighlight` on the `trips` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `trips` DROP COLUMN `isHighlight`,
    ADD COLUMN `is_highlight` BOOLEAN NOT NULL DEFAULT false;
