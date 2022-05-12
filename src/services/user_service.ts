import { validate } from "class-validator";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import CustomError from "../error/error";

export const userService = {
  async create(name: string, email: string, password: string) {
    const repo = AppDataSource.getRepository(User);

    const user = repo.create({ name, email, password });
    const errors = await validate(user);
    if (errors.length > 0) {
      console.log(
        errors.map((error) => Object.values(error.constraints || {})).join(",")
      );
      throw new CustomError(400, "正しいメールアドレスを入力してください。");
    }
    await repo.save(user);

    return user;
  },

  async findByEmail(email: string): Promise<User | undefined> {
    try {
      const repo = AppDataSource.getRepository(User);

      const user = await repo.findOneOrFail({ where: { email } });

      return user;
    } catch (error) {
      return null;
    }
  },

  async update(id: number, name: string, email: string) {
    const repo = AppDataSource.getRepository(User);
    let user: User;

    user = await repo.findOneOrFail({ where: { id } });

    user.name = name;
    user.email = email;

    const errors = await validate(user);
    if (errors.length > 0) {
      console.log(
        errors.map((error) => Object.values(error.constraints || {})).join(",")
      );
      throw new CustomError(400, "正しいメールアドレスを入力してください。");
    }

    await repo.update(id, { name, email });
    return user;
  },

  async findById(id: number) {
    try {
      const repo = AppDataSource.getRepository(User);

      const user = await repo.findOneOrFail({ where: { id } });

      return user;
    } catch (error) {
      return null;
    }
  },
};
