import { Router } from "express";
import TypeController from "../controllers/typeController";
const route = Router();

route.get("/types", TypeController.index);
route.post("/addtypes", TypeController.store);
route.put("/types/:id/update", TypeController.update);
route.delete("/types/:id/delete", TypeController.delete);

export default route;