"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lokasiController_1 = __importDefault(require("../controllers/lokasiController"));
const route = (0, express_1.Router)();
route.get("/lokasis", lokasiController_1.default.index);
route.post("/addlokasis", lokasiController_1.default.add);
route.put("/lokasis/:id/update", lokasiController_1.default.update);
route.delete("/lokasis/:id/delete", lokasiController_1.default.delete);
exports.default = route;
