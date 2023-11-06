-- CreateTable
CREATE TABLE `Daftar_Pekerjaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul_pekerjaan` VARCHAR(191) NULL,
    `deskripsi_pekerjaan` VARCHAR(191) NULL,
    `lokasi_pekerjaan_id` INTEGER NOT NULL,
    `tanggal_posting` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Daftar_Pekerjaan` ADD CONSTRAINT `Daftar_Pekerjaan_lokasi_pekerjaan_id_fkey` FOREIGN KEY (`lokasi_pekerjaan_id`) REFERENCES `lokasi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
