import { Router } from "express";
import FlexibilityController from "../controllers/flexibilityController";
const route = Router();

route.get("/flexibilitys", FlexibilityController.index);
route.post("/addflexibilitys", FlexibilityController.add);
route.put("/flexibilitys/:id/update", FlexibilityController.update);
route.delete("/flexibilitys/:id/delete", FlexibilityController.delete);

export default route;