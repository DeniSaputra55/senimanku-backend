import { Router } from "express";
import ProdukController from "../controllers/produkController";
import { upload } from "../middlewares/upload";
const route = Router();

route.get("/produks", ProdukController.index);
route.post("/addproduks", upload.single("foto_produk"), ProdukController.store);
route.put("/produks/:id/update",  upload.single("foto_produk"), ProdukController.update);
route.delete("/produks/:id/delete", ProdukController.delete);

export default route;