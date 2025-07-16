-- DropForeignKey
ALTER TABLE `testimonies` DROP FOREIGN KEY `testimonies_trip_id_fkey`;

-- AlterTable
ALTER TABLE `testimonies` MODIFY `trip_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `testimonies` ADD CONSTRAINT `testimonies_trip_id_fkey` FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
