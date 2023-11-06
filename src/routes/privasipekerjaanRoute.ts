import { Router } from "express";
import PrivasiPekerjaan from "../controllers/privasi_pekerjaanController";
const route = Router();

route.get("/privasipekerjaans", PrivasiPekerjaan.index);
route.post("/addprivasipekerjaans", PrivasiPekerjaan.add);
route.put("/privasipekerjaans/:id/update", PrivasiPekerjaan.update);
route.delete("/privasipekerjaans/:id/delete", PrivasiPekerjaan.delete);

export default route;