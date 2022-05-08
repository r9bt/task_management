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
exports.deleteTask = exports.updateTask = exports.compleateTask = exports.createTask = exports.fetchAllTasks = void 0;
const task_model_1 = require("../models/task_model");
const fetchAllTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield task_model_1.default.fetchAll();
        res.status(200).send({ tasks: response });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.fetchAllTasks = fetchAllTasks;
const createTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content } = req.body;
        const response = yield task_model_1.default.postTask(content);
        res.status(200).send(response);
    }
    catch (error) {
        console.log("a");
        next(error);
    }
});
exports.createTask = createTask;
const compleateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { isCompleated } = req.body;
        const response = yield task_model_1.default.updateCompleate(Number(id), isCompleated);
        res.status(200).send(response);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.compleateTask = compleateTask;
const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const response = yield task_model_1.default.updateContent(Number(id), content);
        res.status(200).send(response);
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
        const response = yield task_model_1.default.deleteTask(Number(id));
        res.status(200).send(response);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.deleteTask = deleteTask;
//# sourceMappingURL=index.js.map