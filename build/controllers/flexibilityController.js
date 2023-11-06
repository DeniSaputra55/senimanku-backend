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
class FlexibilityController {
    constructor() {
        this.index = (_, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const flexibilities = yield this.prisma.flexibility.findMany();
                res.json(flexibilities);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        this.add = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { flexibility_tipe } = req.body;
            try {
                const flexibility = yield this.prisma.flexibility.create({
                    data: {
                        flexibility_tipe
                    },
                });
                res.json(flexibility);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const { flexibility_tipe } = req.body;
                const flexibility = yield this.prisma.flexibility.update({
                    where: { id },
                    data: {
                        flexibility_tipe
                    }
                });
                res.json(flexibility);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                yield this.prisma.flexibility.delete({
                    where: {
                        id: id
                    }
                });
                res.json({ message: 'data flexibility berhasil dihapus' });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        this.prisma = new client_1.PrismaClient();
    }
}
exports.default = new FlexibilityController();
