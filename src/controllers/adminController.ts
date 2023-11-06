import { Request, Response, NextFunction } from "express";
import passport from "../config/passportAdmin";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

class AdminController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  register = (req: Request, res: Response, next: NextFunction) => {
    // middleware passport
    passport.authenticate(
      "local-register-admin",
      (error: any, admin: any, info: any) => {
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
      }
    )(req, res, next);
  };

  login = (req: Request, res: Response, next: NextFunction) => {
    // middleware passport
    passport.authenticate("local-login-admin", (error: any, admin: any, info: any) => {
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

  logout = (req: Request, res: Response) => {
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

  changePassword = async (req: Request, res: Response) => {
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
      const admin = await this.prisma.admin.findUnique({
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
          message:
            "Data passwordLama, passwordBaru, confPasswordBaru harus diisi",
        });
      }

      // cek password lama di db
      const validPasswordLama = await bcrypt.compare(
        passwordLama,
        admin.password
      );

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
      const salt = await bcrypt.genSalt(10);
      const hashPasswordBaru = await bcrypt.hash(passwordBaru, salt);

      // proses update password
      const adminUpdate = await this.prisma.admin.update({
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
    } catch (error: any) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  };
}

export default new AdminController();
