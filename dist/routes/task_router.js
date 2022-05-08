"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = require("express");
const task_controller_1 = require("../controllers/task_controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
exports.taskRouter = router;
router.get("/", auth_1.auth, task_controller_1.findTaskList);
router.post("/", auth_1.auth, task_controller_1.createTask);
router.get("/:id", auth_1.auth, task_controller_1.findTask);
router.patch("/:id/complete", auth_1.auth, task_controller_1.completeTask);
router.patch("/:id/update", auth_1.auth, task_controller_1.updateTask);
router.delete("/:id", auth_1.auth, task_controller_1.deleteTask);
//# sourceMappingURL=task_router.js.map