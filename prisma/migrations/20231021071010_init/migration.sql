/*
  Warnings:

  - You are about to drop the column `lokasi` on the `lokasi` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `lokasi` DROP COLUMN `lokasi`,
    ADD COLUMN `alamat` VARCHAR(191) NULL;
