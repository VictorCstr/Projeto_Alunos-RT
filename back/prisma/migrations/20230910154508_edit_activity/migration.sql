/*
  Warnings:

  - Added the required column `school` to the `activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `activity` ADD COLUMN `school` ENUM('Dados', 'Tecnologia', 'Produto') NOT NULL;
