"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeController_1 = __importDefault(require("../controllers/typeController"));
const route = (0, express_1.Router)();
route.get("/types", typeController_1.default.index);
route.post("/addtypes", typeController_1.default.store);
route.put("/types/:id/update", typeController_1.default.update);
route.delete("/types/:id/delete", typeController_1.default.delete);
exports.default = route;
