/*
  Warnings:

  - The primary key for the `products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `active` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `inventoryId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `photosId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `products` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `products` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `active` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `cnpj` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `legal_entity` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `typeUserId` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `departaments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `photos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `type_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `typeproducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `departaments` DROP FOREIGN KEY `departaments_postId_fkey`;

-- DropForeignKey
ALTER TABLE `departaments` DROP FOREIGN KEY `departaments_userId_fkey`;

-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `posts_userId_fkey`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_inventoryId_fkey`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_photosId_fkey`;

-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_userId_fkey`;

-- DropForeignKey
ALTER TABLE `typeproducts` DROP FOREIGN KEY `typeProducts_userId_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_typeUserId_fkey`;

-- DropIndex
DROP INDEX `users_cnpj_key` ON `users`;

-- DropIndex
DROP INDEX `users_cpf_key` ON `users`;

-- AlterTable
ALTER TABLE `products` DROP PRIMARY KEY,
    DROP COLUMN `active`,
    DROP COLUMN `inventoryId`,
    DROP COLUMN `photosId`,
    DROP COLUMN `userId`,
    ADD COLUMN `quantity` INTEGER NULL,
    ADD COLUMN `typeProductId` INTEGER NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `price` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `active`,
    DROP COLUMN `age`,
    DROP COLUMN `cnpj`,
    DROP COLUMN `cpf`,
    DROP COLUMN `genre`,
    DROP COLUMN `legal_entity`,
    DROP COLUMN `password`,
    DROP COLUMN `role`,
    DROP COLUMN `typeUserId`,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `departaments`;

-- DropTable
DROP TABLE `inventory`;

-- DropTable
DROP TABLE `photos`;

-- DropTable
DROP TABLE `posts`;

-- DropTable
DROP TABLE `type_users`;

-- DropTable
DROP TABLE `typeproducts`;

-- CreateTable
CREATE TABLE `departmants` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `userId` INTEGER NULL,

    UNIQUE INDEX `departmants_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type_products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `departmants` ADD CONSTRAINT `departmants_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_typeProductId_fkey` FOREIGN KEY (`typeProductId`) REFERENCES `type_products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
