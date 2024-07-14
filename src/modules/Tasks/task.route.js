import { Router } from "express";
import * as taskRouter from "./task.controller.js";
import { authMiddleware } from "../../middlewares/authMiddlware.js";
const route = Router();

route.post("/:categoryId", authMiddleware, taskRouter.addTask);
route.put("/:taskId", authMiddleware, taskRouter.updateTask);
route.get("/", authMiddleware, taskRouter.getAllTasks);
route.delete("/:categoryId", authMiddleware, taskRouter.deleteTask);

export default route;
