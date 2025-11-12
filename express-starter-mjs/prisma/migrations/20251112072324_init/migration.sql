/*
  Warnings:

  - You are about to drop the column `user_name` on the `komentarz` table. All the data in the column will be lost.
  - You are about to drop the column `Title` on the `wpis` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nazwa]` on the table `Kategoria` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `wpisId` to the `Komentarz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kategoriaId` to the `Wpis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tytul` to the `Wpis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `komentarz` DROP COLUMN `user_name`,
    ADD COLUMN `wpisId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `wpis` DROP COLUMN `Title`,
    ADD COLUMN `kategoriaId` INTEGER NOT NULL,
    ADD COLUMN `tytul` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Kategoria_nazwa_key` ON `Kategoria`(`nazwa`);

-- AddForeignKey
ALTER TABLE `Wpis` ADD CONSTRAINT `Wpis_kategoriaId_fkey` FOREIGN KEY (`kategoriaId`) REFERENCES `Kategoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Komentarz` ADD CONSTRAINT `Komentarz_wpisId_fkey` FOREIGN KEY (`wpisId`) REFERENCES `Wpis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
