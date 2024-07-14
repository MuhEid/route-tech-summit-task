import { Router } from "express";
import * as authRouter from "./auth.contoller.js";
const route = Router();

route.post("/", authRouter.signUp);
route.post("/login", authRouter.signIn);

export default route;
