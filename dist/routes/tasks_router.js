"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = require("express");
const task_controller_1 = require("../controllers/task_controller");
const router = (0, express_1.Router)();
exports.taskRouter = router;
router.get("/", task_controller_1.fetchAllTasks);
router.post("/", task_controller_1.createTask);
router.patch("/compleate/:id", task_controller_1.compleateTask);
router.patch("/content/:id", task_controller_1.updateTask);
router.delete("/:id", task_controller_1.deleteTask);
//# sourceMappingURL=tasks_router.js.map