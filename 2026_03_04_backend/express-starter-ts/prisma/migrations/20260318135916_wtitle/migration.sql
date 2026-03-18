/*
  Warnings:

  - Added the required column `Title` to the `Wpis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Wpis` ADD COLUMN `Title` VARCHAR(255) NOT NULL;
