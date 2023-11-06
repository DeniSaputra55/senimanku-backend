import { Router } from "express";
import DaftarPekerjaan from "../controllers/daftar_pekerjaanController";
import route from "./userRoute";
const router = Router();

route.get("/daftarpekerjaans", DaftarPekerjaan.index);
route.post("/adddaftarpekerjaans", DaftarPekerjaan.add);
route.put("/daftarpekerjaans/:id/update", DaftarPekerjaan.update);
route.delete("/daftarpekerjaans/:id/delete", DaftarPekerjaan.delete);

export default route;