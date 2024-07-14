import express from "express";
import dotenv from "dotenv";
import authRouter from "./src/modules/Auth/auth.route.js";
import categoryRouter from "./src/modules/Category/category.route.js";
import taskRouter from "./src/modules/Tasks/task.route.js";

import db_connection from "./DB/connection.js";
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
db_connection();

app.use("/auth", authRouter);
app.use("/category", categoryRouter);
app.use("/task", taskRouter);

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});
