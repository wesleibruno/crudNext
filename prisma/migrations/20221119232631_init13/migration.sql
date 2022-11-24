/*
  Warnings:

  - You are about to drop the column `userId` on the `departmants` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `departmants` DROP FOREIGN KEY `departmants_userId_fkey`;

-- AlterTable
ALTER TABLE `departmants` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `departmantId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_departmantId_fkey` FOREIGN KEY (`departmantId`) REFERENCES `departmants`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
