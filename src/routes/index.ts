import { Request, Response, Router } from "express";
import { taskRouter } from "./task_router";
import { authRouter } from "./auth_router";
import { accountRouter } from "./account_router";

const routers = Router();

routers.get("/", (req: Request, res: Response) =>
  res.status(200).send("good!")
);
routers.use("/tasks", taskRouter);
routers.use("/auth", authRouter);
routers.use("/account", accountRouter);

export default routers;
