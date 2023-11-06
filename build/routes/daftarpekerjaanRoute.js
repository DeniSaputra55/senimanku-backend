"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const daftar_pekerjaanController_1 = __importDefault(require("../controllers/daftar_pekerjaanController"));
const userRoute_1 = __importDefault(require("./userRoute"));
const router = (0, express_1.Router)();
userRoute_1.default.get("/daftarpekerjaans", daftar_pekerjaanController_1.default.index);
userRoute_1.default.post("/adddaftarpekerjaans", daftar_pekerjaanController_1.default.add);
userRoute_1.default.put("/daftarpekerjaans/:id/update", daftar_pekerjaanController_1.default.update);
userRoute_1.default.delete("/daftarpekerjaans/:id/delete", daftar_pekerjaanController_1.default.delete);
exports.default = userRoute_1.default;
