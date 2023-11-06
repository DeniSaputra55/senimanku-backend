"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = __importDefault(require("../controllers/adminController"));
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const route = (0, express_1.Router)();
route.post("/adminregister", adminController_1.default.register);
route.post("/adminlogin", adminController_1.default.login);
route.get("/adminlogout", isAuthenticated_1.isAuthenticated, adminController_1.default.logout);
route.post("/adminchange-password", isAuthenticated_1.isAuthenticated, adminController_1.default.changePassword);
exports.default = route;
