import { RequestHandler } from "express";
import { userService } from "../services/user_service";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { Decode } from "../middleware/auth";
import * as argon2 from "argon2";
import { User } from "../entity/User";
import CustomError from "../error/error";

export const getAccount: RequestHandler = async (req, res, next) => {
  try {
    const id = (res.locals.decode as Decode).id;
    const user = await userService.findById(id);

    if (!user) return next(new CustomError(400, "ユーザーがいません。"));

    const buildUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    res.status(200).json({
      user: buildUser,
    });
  } catch (error) {
    console.log(error);
    next(new CustomError(400, "アカウント取得に失敗しました"));
  }
};

export const createAccount: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };
    let user: User;

    user = await userService.findByEmail(email);
    if (user)
      return next(new CustomError(400, "既に登録済みのメールアドレスです。"));

    if (password.length < 8)
      return next(
        new CustomError(400, "パスワードは８文字以上でお願いします。")
      );
    const hashedPassword = await argon2.hash(password);

    user = await userService.create(name, email, hashedPassword);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    const buildUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    res.status(200).json({
      user: buildUser,
      token,
    });
  } catch (error) {
    console.log(error);
    next(
      new CustomError(
        400,
        "正しい形式でメールアドレス、パスワードの入力をお願いします。"
      )
    );
  }
};

export const updateAccount: RequestHandler = async (req, res, next) => {
  try {
    const id = (res.locals.decode as Decode).id;
    const { name, email } = req.body as { name: string; email: string };
    const user = await userService.update(id, name, email);

    const buildUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    res.status(200).send({
      user: buildUser,
    });
  } catch (error) {
    console.log(error);
    next(new CustomError(400, "アカウント更新に失敗しました。"));
  }
};
