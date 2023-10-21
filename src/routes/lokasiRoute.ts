import { Router } from "express";
import LokasiController from "../controllers/lokasiController";
const route = Router();

route.get("/lokasis", LokasiController.index);
route.post("/addlokasis", LokasiController.add);
route.put("/lokasis/:id/update", LokasiController.update);
route.delete("/lokasis/:id/delete", LokasiController.delete);

export default route;