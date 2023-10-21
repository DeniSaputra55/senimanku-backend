import { Router } from "express";
import AssetController from "../controllers/assetController";
const route = Router();

route.get("/assets", AssetController.index);
route.post("/addassets", AssetController.add);
route.put("/assets/:id/update", AssetController.update);
route.delete("/assets/:id/delete", AssetController.delete);

export default route;
