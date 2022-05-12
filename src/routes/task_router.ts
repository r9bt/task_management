import { Router } from "express";
import {
  findTaskList,
  createTask,
  completeTask,
  updateTask,
  deleteTask,
  findTask,
} from "../controllers/task_controller";
import { accessToken } from "../middleware/access_token";
const router = Router();

router.get("/", accessToken, findTaskList);
router.post("/", accessToken, createTask);
router.get("/:id", accessToken, findTask);
router.patch("/:id/complete", accessToken, completeTask);
router.patch("/:id/update", accessToken, updateTask);
router.delete("/:id", accessToken, deleteTask);

export { router as taskRouter };
