import { RequestHandler } from "express";
import { userService } from "../services/user_service";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { Decode } from "../middleware/auth";
import * as argon2 from "argon2";
import { User } from "../entity/User";

export const getAccount: RequestHandler = async (req, res, next) => {
  try {
    const id = (res.locals.decode as Decode).id;
    const user = await userService.findById(id);

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
    next(error);
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
    if (user) throw new Error("Arleady used email!");
    if (password.length < 8) throw new Error("Short password!");

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
    next(error);
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
    next(error);
  }
};
