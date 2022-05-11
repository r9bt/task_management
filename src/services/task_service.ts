import { AppDataSource } from "../data-source";
import Task from "../entity/Task";

export const taskService = {
  async findAll(userId: number) {
    const repo = AppDataSource.getRepository(Task);
    const allTasks = await repo.find({ where: { userId } });
    return allTasks;
  },

  async findOne(id: number, userId: number) {
    const repo = AppDataSource.getRepository(Task);
    const task = await repo.findOneOrFail({ where: { id, userId } });
    return task;
  },

  async create(content: string, userId: number) {
    const repo = AppDataSource.getRepository(Task);

    const task = repo.create({ content, userId });
    await repo.save(task);

    return task;
  },

  async updateComplete(id: number, isCompleted: boolean, userId: number) {
    const repo = AppDataSource.getRepository(Task);

    await repo.update(id, { isCompleted });

    const task = await repo.findOneOrFail({ where: { id, userId } });

    return task;
  },

  async updateContent(id: number, content: string, userId: number) {
    const repo = AppDataSource.getRepository(Task);

    await repo.update(id, { content });

    const task = await repo.findOneOrFail({ where: { id, userId } });

    return task;
  },

  async delete(id: number, userId: number) {
    const repo = AppDataSource.getRepository(Task);

    const result = await repo.delete({ id, userId });

    if (result.affected === 0) {
      return new Error();
    }

    return {
      message: "success",
    };
  },
};
