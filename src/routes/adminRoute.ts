import { Router } from "express";
import adminController from "../controllers/adminController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const route = Router();

route.post("/adminregister", adminController.register);
route.post("/adminlogin", adminController.login);
route.get("/adminlogout", isAuthenticated, adminController.logout);
route.post("/adminchange-password", isAuthenticated, adminController.changePassword);

export default route;
