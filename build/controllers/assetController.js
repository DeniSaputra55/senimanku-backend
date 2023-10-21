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
class AssetController {
    constructor() {
        this.index = (_, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const assets = yield this.prisma.asset.findMany();
                res.json(assets);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        this.add = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { asset_type, deskripsi_type, slug } = req.body;
            try {
                const asset = yield this.prisma.asset.create({
                    data: {
                        asset_type,
                        deskripsi_type,
                        slug
                    },
                });
                res.json(asset);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const { asset_type, deskripsi_type, slug } = req.body;
                const asset = yield this.prisma.asset.update({
                    where: { id },
                    data: {
                        asset_type,
                        deskripsi_type,
                        slug
                    }
                });
                res.json(asset);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                yield this.prisma.asset.delete({
                    where: {
                        id: id
                    }
                });
                res.json({ message: 'data berhasil di hapus' });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        this.prisma = new client_1.PrismaClient();
    }
}
exports.default = new AssetController();
