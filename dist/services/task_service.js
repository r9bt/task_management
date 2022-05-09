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
exports.taskService = void 0;
const data_source_1 = require("../data-source");
const Task_1 = require("../entity/Task");
exports.taskService = {
    findAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(Task_1.default);
            const allTasks = yield repo.find({ where: { userId } });
            return allTasks;
        });
    },
    findOne(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(Task_1.default);
            const task = yield repo.findOne({ where: { id, userId } });
            return task;
        });
    },
    create(content, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(Task_1.default);
            const task = repo.create({ content, userId });
            yield repo.save(task);
            return task;
        });
    },
    updateComplete(id, isCompleted, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(Task_1.default);
            yield repo.update(id, { isCompleted });
            const task = yield repo.findOne({ where: { id, userId } });
            return task;
        });
    },
    updateContent(id, content, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(Task_1.default);
            yield repo.update(id, { content });
            const task = yield repo.findOne({ where: { id, userId } });
            return task;
        });
    },
    delete(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = data_source_1.AppDataSource.getRepository(Task_1.default);
            const result = yield repo.delete({ id, userId });
            if (result.affected === 0) {
                return Error("Nothing task!");
            }
            return {
                message: "success",
            };
        });
    },
};
//# sourceMappingURL=task_service.js.map