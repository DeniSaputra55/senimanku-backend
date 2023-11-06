import { Router } from "express";
import AdminProfileController from "../controllers/adminProfileController";
import { upload } from "../middlewares/upload";

const route = Router();

route.post("/admin-profile", AdminProfileController.add);
route.get("/admin-profile", AdminProfileController.get);
route.post(
  "/admin-profile/upload-foto-profil",
  upload.single("foto_profil"),
  AdminProfileController.addFotoProfil
);

export default route;
