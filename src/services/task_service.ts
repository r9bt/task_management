import { AppDataSource } from "../data-source";
import Task from "../entity/Task";
import CustomError from "../error/error";

export const taskService = {
  async findAll(userId: number) {
    const repo = AppDataSource.getRepository(Task);
    const allTasks = await repo.find({ where: { userId } });
    return allTasks;
  },

  async findOne(id: number, userId: number) {
    try {
      const repo = AppDataSource.getRepository(Task);
      const task = await repo.findOneOrFail({ where: { id, userId } });
      return task;
    } catch (_) {
      throw new CustomError(400, "タスクがありませんでした。");
    }
  },

  async create(content: string, userId: number) {
    const repo = AppDataSource.getRepository(Task);

    const task = repo.create({ content, userId });
    await repo.save(task);

    return task;
  },

  async updateComplete(id: number, isCompleted: boolean, userId: number) {
    const repo = AppDataSource.getRepository(Task);

    try {
      await repo.findOneOrFail({ where: { id, userId } });
    } catch (_) {
      throw new CustomError(400, "更新するタスクがありませんでした。");
    }

    await repo.update(id, { isCompleted });
    const task = await repo.findOneOrFail({ where: { id, userId } });
    return task;
  },

  async updateContent(id: number, content: string, userId: number) {
    const repo = AppDataSource.getRepository(Task);

    try {
      await repo.findOneOrFail({ where: { id, userId } });
    } catch (_) {
      throw new CustomError(400, "更新するタスクがありませんでした。");
    }

    await repo.update(id, { content });
    const task = await repo.findOneOrFail({ where: { id, userId } });
    return task;
  },

  async delete(id: number, userId: number) {
    const repo = AppDataSource.getRepository(Task);

    const result = await repo.delete({ id, userId });

    if (result.affected === 0) {
      throw new CustomError(400, "削除するタスクがありませんでした。");
    }

    return {
      message: "success",
    };
  },
};
