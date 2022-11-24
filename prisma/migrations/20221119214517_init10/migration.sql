/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `type_products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `type_products_name_key` ON `type_products`(`name`);
