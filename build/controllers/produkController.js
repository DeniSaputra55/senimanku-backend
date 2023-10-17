"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const uploadImageToImgBB_1 = require("../utils/uploadImageToImgBB");
class ProdukController {
    constructor() {
        this.index = (_, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const produks = yield this.prisma.produk.findMany();
                res.json(produks);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        this.store = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                const imageUrl = yield (0, uploadImageToImgBB_1.uploadImageToImgBB)(fileBuffer, req.file.originalname);
                // validasi: jika gambar gagal terupload
                if (!imageUrl) {
                    return res.status(400).json({
                        status: "error",
                        message: "Gambar gagal terupload",
                    });
                }
                // setelah gambar berhasil terupload, hapus isi file buffer
                req.file.buffer = Buffer.alloc(0);
                const produk = yield this.prisma.produk.create({
                    data: {
                        nama_produk,
                        foto_produk: imageUrl,
                        deskripsi_produk,
                        harga_produk,
                    },
                });
                res.json(produk);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                const imageUrl = yield (0, uploadImageToImgBB_1.uploadImageToImgBB)(fileBuffer, req.file.originalname);
                // validasi: jika gambar gagal terupload
                if (!imageUrl) {
                    return res.status(400).json({
                        status: "error",
                        message: "Gambar gagal terupload",
                    });
                }
                // setelah gambar berhasil terupload, hapus isi file buffer
                req.file.buffer = Buffer.alloc(0);
                const produk = yield this.prisma.produk.update({
                    where: { id },
                    data: {
                        nama_produk,
                        foto_produk: imageUrl,
                        deskripsi_produk,
                        harga_produk,
                    },
                });
                res.json(produk);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                yield this.prisma.produk.delete({
                    where: {
                        id: id,
                    },
                });
                res.json({ message: "Data Produk Berhasil di hapus " });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        this.prisma = new client_1.PrismaClient();
    }
}
exports.default = new ProdukController();
