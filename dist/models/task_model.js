"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_service_1 = require("../services/task_service");
const fetchAll = () => {
    return task_service_1.taskService.fetchAll();
};
const postTask = (content) => {
    return task_service_1.taskService.create(content);
};
const updateCompleate = (id, isCompleated) => {
    return task_service_1.taskService.updateCompleate(id, isCompleated);
};
const updateContent = (id, content) => {
    return task_service_1.taskService.updateContent(id, content);
};
const deleteTask = (id) => {
    return task_service_1.taskService.delete(id);
};
exports.default = {
    fetchAll,
    postTask,
    updateCompleate,
    updateContent,
    deleteTask,
};
//# sourceMappingURL=task_model.js.map