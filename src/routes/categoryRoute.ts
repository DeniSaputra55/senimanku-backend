import { Router } from "express";
import CategoryController from "../controllers/categoryController";
const route = Router();

route.get("/categorys", CategoryController.index);
route.post("/addcategorys", CategoryController.add);
route.put("/categorys/:id/update", CategoryController.update);
route.delete("/categorys/:id/delete", CategoryController.delete);

export default route;