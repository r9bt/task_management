import { AppDataSource } from "../data-source";
import Task from "../entity/Task";

export const taskService = {
  async findAll() {
    const repo = AppDataSource.getRepository(Task);
    const allTasks = await repo.find();
    return allTasks;
  },

  async findOne(id: number) {
    const repo = AppDataSource.getRepository(Task);
    const task = await repo.findOne({ where: { id } });
    return task;
  },

  async create(content: string) {
    const repo = AppDataSource.getRepository(Task);

    const task = repo.create({ content });
    await repo.save(task);

    return task;
  },

  async updateComplete(id: number, isCompleted: boolean) {
    const repo = AppDataSource.getRepository(Task);

    await repo.update(id, { isCompleted });

    const task = await repo.findOne({ where: { id } });

    return task;
  },

  async updateContent(id: number, content: string) {
    const repo = AppDataSource.getRepository(Task);

    await repo.update(id, { content });

    const task = await repo.findOne({ where: { id } });

    return task;
  },

  async delete(id: number) {
    const repo = AppDataSource.getRepository(Task);

    const result = await repo.delete(id);

    if (result.affected === 0) {
      return Error("Nothing task!");
    }

    return {
      message: "success",
    };
  },
};
