"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const assetController_1 = __importDefault(require("../controllers/assetController"));
const route = (0, express_1.Router)();
route.get("/assets", assetController_1.default.index);
route.post("/addassets", assetController_1.default.add);
route.put("/assets/:id/update", assetController_1.default.update);
route.delete("/assets/:id/delete", assetController_1.default.delete);
exports.default = route;
