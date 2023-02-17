-- AlterTable
ALTER TABLE `Collection` ADD COLUMN `parentId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Collection` ADD CONSTRAINT `Collection_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Collection`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
