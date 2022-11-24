/*
  Warnings:

  - You are about to drop the column `productId` on the `type_products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `type_products` DROP FOREIGN KEY `type_products_productId_fkey`;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `typeProductId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `type_products` DROP COLUMN `productId`;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_typeProductId_fkey` FOREIGN KEY (`typeProductId`) REFERENCES `type_products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
