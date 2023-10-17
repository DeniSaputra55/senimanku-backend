import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { uploadImageToImgBB } from "../utils/uploadImageToImgBB";

class ProdukController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  index = async (_: Request, res: Response) => {
    try {
      const produks = await this.prisma.produk.findMany();
      res.json(produks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  store = async (req: Request, res: Response) => {
    try {
      const { nama_produk, deskripsi_produk } = req.body;
      const harga_produk = parseFloat(req.body.harga_produk);
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
      const produk = await this.prisma.produk.create({
        data: {
          nama_produk,
          foto_produk: imageUrl,
          deskripsi_produk,
          harga_produk,
        },
      });
      res.json(produk);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { nama_produk, deskripsi_produk } = req.body;
      const harga_produk = parseFloat(req.body.harga_produk);

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

      const produk = await this.prisma.produk.update({
        where: { id },
        data: {
          nama_produk,
          foto_produk: imageUrl,
          deskripsi_produk,
          harga_produk,
        },
      });
      res.json(produk);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await this.prisma.produk.delete({
        where: {
          id: id,
        },
      });
      res.json({ message: "Data Produk Berhasil di hapus " });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default new ProdukController();
