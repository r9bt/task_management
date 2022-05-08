import { validate } from "class-validator";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export const userService = {
  async find() {
    const repo = AppDataSource.getRepository(User);
    const allUsers = await repo.find();
    return allUsers;
  },

  async create(name: string, email: string, password: string) {
    const repo = AppDataSource.getRepository(User);

    const user = repo.create({ name, email, password });
    const errors = await validate(user);
    if (errors.length > 0)
      throw new Error(
        errors.map((error) => Object.values(error.constraints || {})).join(",")
      );
    await repo.save(user);

    return user;
  },

  async findByEmail(email: string): Promise<User | undefined> {
    const repo = AppDataSource.getRepository(User);

    const user = await repo.findOne({ where: { email } });
    const errors = await validate(user);

    return user;
  },

  async update(id: number, name: string, email: string) {
    const repo = AppDataSource.getRepository(User);

    await repo.update(id, { name, email });

    const user = await repo.findOne({ where: { id } });

    return user;
  },

  async findById(id: number) {
    const repo = AppDataSource.getRepository(User);

    const user = await repo.findOne({ where: { id } });

    return user;
  },
};
