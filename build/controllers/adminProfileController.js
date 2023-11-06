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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const dayjs_1 = __importDefault(require("dayjs"));
const validator_1 = __importDefault(require("validator"));
const uploadImageToImgBB_1 = require("../utils/uploadImageToImgBB");
class AdminProfileController {
    constructor() {
        // tambah admin profile
        // -> jika belum ada admin profile berdasarkan admin_id, maka buat dulu data admin profilenya
        // -> jika sudah ada admin profile berdasarkan admin_id, maka update saja data admin profilenya
        this.add = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // ambil data admin_id;
                const admin_id = parseInt(req.body.admin_id);
                // Cari admin di database
                const admin = yield this.prisma.admin.findUnique({
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
                const adminProfile = yield this.prisma.adminProfile.findUnique({
                    where: {
                        admin_id,
                    },
                });
                // Ambil data dari req.body
                const { nama, no_hp, tanggal_lahir, alamat } = req.body;
                // convert ke format ISO (2023-08-27)
                const tanggal_lahir_iso = (0, dayjs_1.default)(tanggal_lahir).toISOString();
                // validasi: apakah no_hp valid
                if (!validator_1.default.isMobilePhone(no_hp, "id-ID")) {
                    return res.status(400).json({
                        status: "error",
                        message: "No Hp tidak valid",
                    });
                }
                // Buat object admin profile
                const newAdminProfile = {
                    nama: nama || (adminProfile === null || adminProfile === void 0 ? void 0 : adminProfile.nama) || "",
                    no_hp: no_hp || (adminProfile === null || adminProfile === void 0 ? void 0 : adminProfile.no_hp) || "",
                    tanggal_lahir: tanggal_lahir_iso || (adminProfile === null || adminProfile === void 0 ? void 0 : adminProfile.tanggal_lahir) || "",
                    alamat: alamat || (adminProfile === null || adminProfile === void 0 ? void 0 : adminProfile.alamat) || "",
                };
                if (adminProfile) {
                    // Jika adminProfile sudah ada, update data saja
                    const updateAdminProfile = yield this.prisma.adminProfile.update({
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
                }
                else {
                    // Jika adminProfile belum ada, tambahkan data baru
                    const createAdminProfile = yield this.prisma.adminProfile.create({
                        data: Object.assign(Object.assign({}, newAdminProfile), { admin: {
                                connect: {
                                    id: admin_id,
                                },
                            } }),
                    });
                    // Response sukses
                    return res.status(201).json({
                        status: "success",
                        message: "Berhasil menambahkan admin profile",
                        adminProfileId: createAdminProfile.id,
                    });
                }
            }
            catch (error) {
                // Tangani kesalahan
                console.error(error);
                return res.status(500).json({
                    status: "error",
                    message: "Terjadi kesalahan internal",
                });
            }
        });
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // ambil data admin_id dari req.body
                const admin_id = parseInt(req.body.admin_id);
                // cek admin profile berdasarkan admin_id
                const adminProfile = yield this.prisma.adminProfile.findUnique({
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
            }
            catch (error) {
                return res.status(500).json({ status: "error", message: error.message });
            }
        });
        this.addFotoProfil = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // ambil id admin
                const admin_id = parseInt(req.body.admin_id);
                // cek admin berdasarkan admin_id
                const admin = yield this.prisma.admin.findUnique({
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
                // proses update data
                const adminProfile = yield this.prisma.adminProfile.update({
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
            }
            catch (error) {
                return res.status(500).json({
                    status: "error",
                    message: error.message,
                });
            }
        });
        this.prisma = new client_1.PrismaClient();
    }
}
exports.default = new AdminProfileController();
