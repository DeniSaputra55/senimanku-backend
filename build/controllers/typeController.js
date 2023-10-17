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
class TypeController {
    constructor() {
        this.index = (_, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const types = yield this.prisma.type.findMany();
                res.json(types);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        this.store = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { deskripsi_type } = req.body;
            try {
                const type = yield this.prisma.type.create({
                    data: {
                        deskripsi_type,
                    },
                });
                res.json(type);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const { deskripsi_type } = req.body;
                const type = yield this.prisma.type.update({
                    where: { id },
                    data: {
                        deskripsi_type,
                    },
                });
                res.json(type);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                yield this.prisma.type.delete({
                    where: {
                        id: id
                    },
                });
                res.json({ message: "data berhasil di hapus" });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        this.prisma = new client_1.PrismaClient();
    }
}
exports.default = new TypeController();
