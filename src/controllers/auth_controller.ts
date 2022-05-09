import { RequestHandler } from "express";
import { userService } from "../services/user_service";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { Decode } from "../middleware/auth";
import * as argon2 from "argon2";

export const logIn: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    if (password.length < 8) throw new Error("Short password!");

    const user = await userService.findByEmail(email);
    if (!user) return new Error("Missing email!");

    const valid = await argon2.verify(user.password, password);
    if (!valid) return new Error("Missing password!");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    const buildUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    res.status(200).json({ user: buildUser, token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const logOut: RequestHandler = async (req, res, next) => {
  try {
    const id = (res.locals.decode as Decode).id;
    const user = await userService.findById(id);

    if (!user) {
      throw new Error("Can't logOut");
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
