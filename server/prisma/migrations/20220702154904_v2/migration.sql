/*
  Warnings:

  - You are about to drop the column `categoryName` on the `Content` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Content` DROP FOREIGN KEY `Content_categoryName_fkey`;

-- AlterTable
ALTER TABLE `Content` DROP COLUMN `categoryName`;

-- CreateTable
CREATE TABLE `_CategoryToContent` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoryToContent_AB_unique`(`A`, `B`),
    INDEX `_CategoryToContent_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CategoryToContent` ADD CONSTRAINT `_CategoryToContent_A_fkey` FOREIGN KEY (`A`) REFERENCES `Category`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToContent` ADD CONSTRAINT `_CategoryToContent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Content`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
