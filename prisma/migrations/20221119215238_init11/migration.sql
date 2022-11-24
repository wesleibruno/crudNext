/*
  Warnings:

  - You are about to drop the column `typeProductId` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_typeProductId_fkey`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `typeProductId`;

-- AlterTable
ALTER TABLE `type_products` ADD COLUMN `productId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `type_products` ADD CONSTRAINT `type_products_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
