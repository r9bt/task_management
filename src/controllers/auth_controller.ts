import { RequestHandler } from "express";
import { userService } from "../services/user_service";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { Decode } from "../middleware/access_token";
import * as argon2 from "argon2";
import CustomError from "../error/error";

export const logIn: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    const user = await userService.findByEmail(email);
    if (!user)
      return next(new CustomError(400, "メールアドレスが正しくありません。"));

    if (password.length < 8)
      return next(
        new CustomError(400, "パスワードは８文字以上でお願いします。")
      );

    const valid = await argon2.verify(user.password, password);
    if (!valid)
      return next(new CustomError(400, "パスワードが正しくありません。"));

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    const buildUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    res.status(200).json({ user: buildUser, token });
  } catch (error: unknown) {
    console.log(error);
    next(new CustomError(400, "ログインに失敗しました。"));
  }
};

export const logOut: RequestHandler = async (req, res, next) => {
  try {
    const id = (res.locals.decode as Decode).id;
    const user = await userService.findById(id);

    if (!user) {
      return next(new CustomError(400, "ログアウトするユーザーがいません。"));
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(new CustomError(400, "ログアウトに失敗しました。"));
  }
};
