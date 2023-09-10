/*
  Warnings:

  - You are about to drop the column `name` on the `activity` table. All the data in the column will be lost.
  - Added the required column `activityName` to the `activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `activity` DROP COLUMN `name`,
    ADD COLUMN `activityName` VARCHAR(191) NOT NULL;
