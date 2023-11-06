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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const prisma = new client_1.PrismaClient();
// serialisasi
passport_1.default.serializeUser((admin, done) => {
    done(null, admin.id);
});
// deserialisasi
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield prisma.admin.findUnique({
            where: {
                id,
            },
        });
        done(null, admin);
    }
    catch (error) {
        done(error);
    }
}));
// strategy local-login
passport_1.default.use("local-login-admin", new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
}, (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // cek user berdasarkan username
        const admin = yield prisma.admin.findUnique({
            where: {
                email,
            },
        });
        // validasi: jika user tidak ditemukan
        if (!admin) {
            return done(null, false, { message: "admin tidak ditemukan" });
        }
        // compare password
        const validPassword = yield bcrypt_1.default.compare(password, admin.password);
        // validasi: jika password salah
        if (!validPassword) {
            return done(null, false, { message: "Password salah" });
        }
        return done(null, admin);
    }
    catch (error) {
        done(error);
    }
})));
// strategy local-register
passport_1.default.use("local-register-admin", new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
}, (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    // validasi: apakah email valid
    if (!validator_1.default.isEmail(email)) {
        return done(null, false, { message: "Email tidak valid" });
    }
    // cek user di db
    const existingUser = yield prisma.admin.findUnique({
        where: {
            email,
        },
    });
    // validasi: jika user sudah ada
    if (existingUser) {
        return done(null, false, { message: "Admin sudah ada" });
    }
    // hash password
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashPassword = yield bcrypt_1.default.hash(password, salt);
    const newUser = yield prisma.admin.create({
        data: {
            email,
            password: hashPassword,
        },
    });
    done(null, newUser);
})));
exports.default = passport_1.default;
