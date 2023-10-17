"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = __importDefault(require("../controllers/categoryController"));
const route = (0, express_1.Router)();
route.get("/categorys", categoryController_1.default.index);
route.post("/addcategorys", categoryController_1.default.add);
route.put("/categorys/:id/update", categoryController_1.default.update);
route.delete("/categorys/:id/delete", categoryController_1.default.delete);
exports.default = route;
