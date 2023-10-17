"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const produkController_1 = __importDefault(require("../controllers/produkController"));
const upload_1 = require("../middlewares/upload");
const route = (0, express_1.Router)();
route.get("/produks", produkController_1.default.index);
route.post("/addproduks", upload_1.upload.single("foto_produk"), produkController_1.default.store);
route.put("/produks/:id/update", upload_1.upload.single("foto_produk"), produkController_1.default.update);
route.delete("/produks/:id/delete", produkController_1.default.delete);
exports.default = route;
