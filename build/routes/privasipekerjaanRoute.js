"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const privasi_pekerjaanController_1 = __importDefault(require("../controllers/privasi_pekerjaanController"));
const route = (0, express_1.Router)();
route.get("/privasipekerjaans", privasi_pekerjaanController_1.default.index);
route.post("/addprivasipekerjaans", privasi_pekerjaanController_1.default.add);
route.put("/privasipekerjaans/:id/update", privasi_pekerjaanController_1.default.update);
route.delete("/privasipekerjaans/:id/delete", privasi_pekerjaanController_1.default.delete);
exports.default = route;
