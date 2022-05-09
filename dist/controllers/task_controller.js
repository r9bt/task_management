"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.completeTask = exports.createTask = exports.findTask = exports.findTaskList = void 0;
const task_service_1 = require("../services/task_service");
const findTaskList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.decode.id;
        const tasks = yield task_service_1.taskService.findAll(userId);
        res.status(200).json({ tasks });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.findTaskList = findTaskList;
const findTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = res.locals.decode.id;
        const task = yield task_service_1.taskService.findOne(Number(id), userId);
        res.status(200).json({ task });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.findTask = findTask;
const createTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.decode.id;
        const { content } = req.body;
        const task = yield task_service_1.taskService.create(content, userId);
        res.status(200).json({
            task: {
                id: task.id,
                userId: task.userId,
                content: task.content,
                isCompleted: task.isCompleted,
            },
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.createTask = createTask;
const completeTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { isCompleted } = req.body;
        const userId = res.locals.decode.id;
        const task = yield task_service_1.taskService.updateComplete(Number(id), isCompleted, userId);
        res.status(200).json({ task });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.completeTask = completeTask;
const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const userId = res.locals.decode.id;
        const task = yield task_service_1.taskService.updateContent(Number(id), content, userId);
        res.status(200).json({ task });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = res.locals.decode.id;
        const result = yield task_service_1.taskService.delete(Number(id), userId);
        res.status(200).json({ message: result.message });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.deleteTask = deleteTask;
//# sourceMappingURL=task_controller.js.map