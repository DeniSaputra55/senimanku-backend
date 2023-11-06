import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import validator from "validator";
import { uploadImageToImgBB } from "../utils/uploadImageToImgBB";

class AdminProfileController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // tambah admin profile
  // -> jika belum ada admin profile berdasarkan admin_id, maka buat dulu data admin profilenya
  // -> jika sudah ada admin profile berdasarkan admin_id, maka update saja data admin profilenya
  add = async (req: Request, res: Response) => {
    try {
      // ambil data admin_id;
      const admin_id = parseInt(req.body.admin_id);

      // Cari admin di database
      const admin = await this.prisma.admin.findUnique({
        where: {
          id: admin_id,
        },
      });

      // Validasi: jika admin tidak ditemukan
      if (!admin) {
        return res.status(404).json({
          status: "error",
          message: "admin tidak ditemukan",
        });
      }

      // Cari adminProfile berdasarkan admin_id
      const adminProfile = await this.prisma.adminProfile.findUnique({
        where: {
          admin_id,
        },
      });

      // Ambil data dari req.body
      const { nama, no_hp, tanggal_lahir, alamat } = req.body;
      // convert ke format ISO (2023-08-27)
      const tanggal_lahir_iso = dayjs(tanggal_lahir).toISOString();

      // validasi: apakah no_hp valid
      if (!validator.isMobilePhone(no_hp, "id-ID")) {
        return res.status(400).json({
          status: "error",
          message: "No Hp tidak valid",
        });
      }

      // Buat object admin profile
      const newAdminProfile = {
        nama: nama || adminProfile?.nama || "", // Gunakan nama default jika tidak ada data baru
        no_hp: no_hp || adminProfile?.no_hp || "",
        tanggal_lahir: tanggal_lahir_iso || adminProfile?.tanggal_lahir || "",
        alamat: alamat || adminProfile?.alamat || "",
      };

      if (adminProfile) {
        // Jika adminProfile sudah ada, update data saja
        const updateAdminProfile = await this.prisma.adminProfile.update({
          data: newAdminProfile,
          where: {
            admin_id,
          },
        });

        // Response sukses
        return res.status(201).json({
          status: "success",
          message: "Berhasil menambahkan admin profile",
          adminProfileId: updateAdminProfile.id,
        });
      } else {
        // Jika adminProfile belum ada, tambahkan data baru
        const createAdminProfile = await this.prisma.adminProfile.create({
          data: {
            ...newAdminProfile, // Menggabungkan properti dari newUserProfile
            admin: {
              connect: {
                id: admin_id,
              },
            },
          },
        });

        // Response sukses
        return res.status(201).json({
          status: "success",
          message: "Berhasil menambahkan admin profile",
          adminProfileId: createAdminProfile.id,
        });
      }
    } catch (error) {
      // Tangani kesalahan
      console.error(error);
      return res.status(500).json({
        status: "error",
        message: "Terjadi kesalahan internal",
      });
    }
  };

  get = async (req: Request, res: Response) => {
    try {
      // ambil data admin_id dari req.body
      const admin_id = parseInt(req.body.admin_id);

      // cek admin profile berdasarkan admin_id
      const adminProfile = await this.prisma.adminProfile.findUnique({
        where: {
          admin_id,
        },
      });

      // validasi: jika admin profile tidak ada
      if (!adminProfile) {
        return res
          .status(404)
          .json({ status: "error", message: "Admin Profile tidak ditemukan" });
      }

      // berikan response success
      return res.json({
        status: "success",
        message: "Berhasil mengambil data admin profile",
        adminProfile,
      });

      // prosses ambil admin profile berdasarkan id
    } catch (error: any) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  };

  addFotoProfil = async (req: Request, res: Response) => {
    try {
      // ambil id admin
      const admin_id = parseInt(req.body.admin_id);

      // cek admin berdasarkan admin_id
      const admin = await this.prisma.admin.findUnique({
        where: {
          id: admin_id,
        },
      });

      // validasi: jika admin tidak ditemukan
      if (!admin) {
        return res.status(404).json({
          status: "error",
          message: "Admin tidak ditemukan",
        });
      }

      // ambil data file
      // jika ada file yang diupload, isi dengan file buffernya klo ga ada isi null
      const fileBuffer = req.file ? req.file.buffer : null;

      // validasi: jika tidak ada file gambar yang dipilih
      if (!req.file) {
        return res.status(400).json({
          status: "error",
          message: "File gambar tidak ditemukan",
        });
      }

      // proses upload image ke imgbb
      const imageUrl = await uploadImageToImgBB(
        fileBuffer,
        req.file.originalname
      );

      // validasi: jika gambar gagal terupload
      if (!imageUrl) {
        return res.status(400).json({
          status: "error",
          message: "Gambar gagal terupload",
        });
      }

      // setelah gambar berhasil terupload, hapus isi file buffer
      req.file.buffer = Buffer.alloc(0);

      // proses update data
      const adminProfile = await this.prisma.adminProfile.update({
        data: {
          foto_profil: imageUrl,
        },
        where: {
          admin_id,
        },
      });

      // berikan response success
      return res.json({
        status: "success",
        message: "Berhasil menambahkan foto profil",
        adminProfileId: adminProfile.id,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };
}

export default new AdminProfileController();
