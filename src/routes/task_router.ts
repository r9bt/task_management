import { Router } from "express";
import {
  findTaskList,
  createTask,
  completeTask,
  updateTask,
  deleteTask,
  findTask,
} from "../controllers/task_controller";
import { auth } from "../middleware/auth";
const router = Router();

router.get("/", auth, findTaskList);
router.post("/", auth, createTask);
router.get("/:id", auth, findTask);
router.patch("/:id/complete", auth, completeTask);
router.patch("/:id/update", auth, updateTask);
router.delete("/:id", auth, deleteTask);

export { router as taskRouter };
