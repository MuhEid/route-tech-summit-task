import { Router } from "express";
import * as categoryRouter from "./category.controller.js";
import { authMiddleware } from "../../middlewares/authMiddlware.js";
const route = Router();

route.post("/", authMiddleware, categoryRouter.addCategory);
route.put("/:categoryId", authMiddleware, categoryRouter.updateCategory);
route.get("/", categoryRouter.getAllCategories);
route.delete("/:categoryId", authMiddleware, categoryRouter.deleteCategory);

export default route;
