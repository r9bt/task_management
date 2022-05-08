import { db } from "../db/database";

export class TaskModel {
  // constructor(
  //   public id: number,
  //   public content: string,
  //   public isCompleated: boolean
  // ) {}

  static fetchAll() {
    return db.execute("SELECT * FROM tasks");
  }

  static post(content: string) {
    return db.execute("INSERT INTO tasks (content) VALUES (?)", [content]);
  }

  static updateCompleate(id: number, isCompleated: boolean) {
    return db.execute("UPDATE tasks SET isCompleated = ? WHERE id = ?", [
      isCompleated,
      id,
    ]);
  }

  static updateContent(id: number, content: string) {
    return db.execute("UPDATE tasks SET content = ? WHERE id = ?", [
      content,
      id,
    ]);
  }

  static delete(id: number) {
    return db.execute("DELETE FROM tasks WHERE id = ?", [id]);
  }
}
