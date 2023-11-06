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
const passportAdmin_1 = __importDefault(require("../config/passportAdmin"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AdminController {
    constructor() {
        this.register = (req, res, next) => {
            // middleware passport
            passportAdmin_1.default.authenticate("local-register-admin", (error, admin, info) => {
                // validasi: jika error
                // error => data error
                if (error) {
                    return res.status(500).json({
                        status: "error",
                        message: error.message,
                    });
                }
                // validasi: jika admin tidak berhasil register
                // admin => data admin yang berhasil register
                if (!admin) {
                    // pesan kesalahan / informasi tambahan ketika otentikasi
                    if (info) {
                        return res.status(401).json({
                            status: "error",
                            message: info.message,
                        });
                    }
                }
                // response success
                return res.status(201).json({
                    status: "success",
                    message: "Registrasi berhasil",
                    admin,
                });
            })(req, res, next);
        };
        this.login = (req, res, next) => {
            // middleware passport
            passportAdmin_1.default.authenticate("local-login-admin", (error, admin, info) => {
                // validasi: jika error
                // error => data error
                if (error) {
                    return res.status(500).json({
                        status: "error",
                        message: error.message,
                    });
                }
                // validasi: jika admin tidak berhasil login
                // admin => data admin yang berhasil login
                if (!admin) {
                    // pesan kesalahan / informasi tambahan ketika otentikasi
                    if (info) {
                        return res.status(401).json({
                            status: "error",
                            message: info.message,
                        });
                    }
                }
                // strategi otektikasi berbasis sesi
                // req.login() = method passport yg digunakan untuk menyimpan data admin ketika berhasil login
                req.login(admin, (error) => {
                    // validasi: jika error
                    if (error) {
                        return res.status(500).json({
                            status: "error",
                            message: error.message,
                        });
                    }
                    // response success
                    return res.json({
                        status: "success",
                        message: "Login berhasil",
                        admin,
                    });
                });
            })(req, res, next);
        };
        this.logout = (req, res) => {
            req.logout((error) => {
                // validas: jika error
                if (error) {
                    return res.status(500).json({
                        status: "error",
                        message: error.message,
                    });
                }
                // response success
                return res.json({ status: "success", message: "Logout berhasil" });
            });
        };
        this.changePassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // ambil id admin
                const id = parseInt(req.body.id);
                // validasi: jika tidak mengirimkan id
                if (!id) {
                    return res.status(400).json({
                        status: "error",
                        message: "Data id harus diisi",
                    });
                }
                // cek admin berdasarkan id
                const admin = yield this.prisma.admin.findUnique({
                    where: {
                        id,
                    },
                });
                // validasi: jika admin tidak ada
                if (!admin) {
                    return res.status(404).json({
                        status: "error",
                        message: "admin tidak ditemukan",
                    });
                }
                // ambil data password
                const { passwordLama, passwordBaru, confPasswordBaru } = req.body;
                // validasi: jika tidak mengirimkan data lengkap
                if (!passwordLama || !passwordBaru || !confPasswordBaru) {
                    return res.status(400).json({
                        status: "error",
                        message: "Data passwordLama, passwordBaru, confPasswordBaru harus diisi",
                    });
                }
                // cek password lama di db
                const validPasswordLama = yield bcrypt_1.default.compare(passwordLama, admin.password);
                // validasi: jika password salah / tidak sama / tidak valid
                if (!validPasswordLama) {
                    return res.status(400).json({
                        status: "error",
                        message: "Password lama tidak valid",
                    });
                }
                // validasi: compare password baru
                if (passwordBaru !== confPasswordBaru) {
                    return res.status(400).json({
                        status: "error",
                        message: "Password baru tidak sama",
                    });
                }
                // hash password baru
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashPasswordBaru = yield bcrypt_1.default.hash(passwordBaru, salt);
                // proses update password
                const adminUpdate = yield this.prisma.admin.update({
                    data: {
                        password: hashPasswordBaru,
                    },
                    where: {
                        id,
                    },
                });
                // berikan response success
                return res.json({
                    status: "success",
                    message: "Password berhasil diganti",
                    adminId: adminUpdate.id,
                });
            }
            catch (error) {
                return res.status(500).json({ status: "error", message: error.message });
            }
        });
        this.prisma = new client_1.PrismaClient();
    }
}
exports.default = new AdminController();
