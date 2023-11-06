"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const flexibilityController_1 = __importDefault(require("../controllers/flexibilityController"));
const route = (0, express_1.Router)();
route.get("/flexibilitys", flexibilityController_1.default.index);
route.post("/addflexibilitys", flexibilityController_1.default.add);
route.put("/flexibilitys/:id/update", flexibilityController_1.default.update);
route.delete("/flexibilitys/:id/delete", flexibilityController_1.default.delete);
exports.default = route;
