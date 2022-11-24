/*
  Warnings:

  - You are about to drop the column `departmantId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_departmantId_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `departmantId`,
    ADD COLUMN `departmentId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `department`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
