import passport from "passport";
import { Strategy } from "passport-local";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import validator from "validator";

const prisma = new PrismaClient();

// serialisasi
passport.serializeUser((admin: any, done: any) => {
  done(null, admin.id);
});

// deserialisasi
passport.deserializeUser(async (id: any, done: any) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        id,
      },
    });

    done(null, admin);
  } catch (error) {
    done(error);
  }
});

// strategy local-login
passport.use(
  "local-login-admin",
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        // cek user berdasarkan username
        const admin = await prisma.admin.findUnique({
          where: {
            email,
          },
        });

        // validasi: jika user tidak ditemukan
        if (!admin) {
          return done(null, false, { message: "admin tidak ditemukan" });
        }

        // compare password
        const validPassword = await bcrypt.compare(password, admin.password);

        // validasi: jika password salah
        if (!validPassword) {
          return done(null, false, { message: "Password salah" });
        }

        return done(null, admin);
      } catch (error) {
        done(error);
      }
    }
  )
);

// strategy local-register
passport.use(
  "local-register-admin",
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      // validasi: apakah email valid
      if (!validator.isEmail(email)) {
        return done(null, false, { message: "Email tidak valid" });
      }

      // cek user di db
      const existingUser = await prisma.admin.findUnique({
        where: {
          email,
        },
      });

      // validasi: jika user sudah ada
      if (existingUser) {
        return done(null, false, { message: "Admin sudah ada" });
      }

      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const newUser = await prisma.admin.create({
        data: {
          email,
          password: hashPassword,
        },
      });

      done(null, newUser);
    }
  )
);

export default passport;
