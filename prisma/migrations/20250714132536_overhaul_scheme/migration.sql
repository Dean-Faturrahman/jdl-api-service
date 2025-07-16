-- DropForeignKey
ALTER TABLE `testimonies` DROP FOREIGN KEY `testimonies_tripId_fkey`;

-- AddForeignKey
ALTER TABLE `testimonies` ADD CONSTRAINT `testimonies_tripId_fkey` FOREIGN KEY (`tripId`) REFERENCES `trips`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
