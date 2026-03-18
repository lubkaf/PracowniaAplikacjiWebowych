/*
  Warnings:

  - You are about to drop the column `KomentarzId` on the `Wpis` table. All the data in the column will be lost.
  - Added the required column `WpisId` to the `Komentarz` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Wpis` DROP FOREIGN KEY `Wpis_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Wpis` DROP FOREIGN KEY `Wpis_ibfk_2`;

-- DropIndex
DROP INDEX `komentarzId` ON `Wpis`;

-- AlterTable
ALTER TABLE `Komentarz` ADD COLUMN `WpisId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Wpis` DROP COLUMN `KomentarzId`;

-- CreateIndex
CREATE INDEX `Komentarz_WpisId_idx` ON `Komentarz`(`WpisId`);

-- AddForeignKey
ALTER TABLE `Wpis` ADD CONSTRAINT `Wpis_KategoriaId_fkey` FOREIGN KEY (`KategoriaId`) REFERENCES `Kategoria`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Komentarz` ADD CONSTRAINT `Komentarz_WpisId_fkey` FOREIGN KEY (`WpisId`) REFERENCES `Wpis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RedefineIndex
CREATE INDEX `Wpis_KategoriaId_idx` ON `Wpis`(`KategoriaId`);
DROP INDEX `kategoriaId` ON `Wpis`;
