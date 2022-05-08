"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = void 0;
const database_1 = require("../db/database");
class TaskModel {
    // constructor(
    //   public id: number,
    //   public content: string,
    //   public isCompleated: boolean
    // ) {}
    static fetchAll() {
        return database_1.db.execute("SELECT * FROM tasks");
    }
    static post(content) {
        return database_1.db.execute("INSERT INTO tasks (content) VALUES (?)", [content]);
    }
    static updateCompleate(id, isCompleated) {
        return database_1.db.execute("UPDATE tasks SET isCompleated = ? WHERE id = ?", [
            isCompleated,
            id,
        ]);
    }
    static updateContent(id, content) {
        return database_1.db.execute("UPDATE tasks SET content = ? WHERE id = ?", [
            content,
            id,
        ]);
    }
    static delete(id) {
        return database_1.db.execute("DELETE FROM tasks WHERE id = ?", [id]);
    }
}
exports.TaskModel = TaskModel;
//# sourceMappingURL=index.js.map