/*
  Warnings:

  - You are about to drop the `_PostInCollection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_PostInCollection` DROP FOREIGN KEY `_PostInCollection_A_fkey`;

-- DropForeignKey
ALTER TABLE `_PostInCollection` DROP FOREIGN KEY `_PostInCollection_B_fkey`;

-- AlterTable
ALTER TABLE `Report` MODIFY `status` ENUM('PENDING', 'PROCESSING', 'ACCEPTED', 'REJECTED') NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE `_PostInCollection`;

-- CreateTable
CREATE TABLE `PostInCollection` (
    `collectionId` INTEGER NOT NULL,
    `postId` INTEGER NOT NULL,

    PRIMARY KEY (`collectionId`, `postId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PostInCollection` ADD CONSTRAINT `PostInCollection_collectionId_fkey` FOREIGN KEY (`collectionId`) REFERENCES `Collection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostInCollection` ADD CONSTRAINT `PostInCollection_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
