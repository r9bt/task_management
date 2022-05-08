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

    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const logOut: RequestHandler = async (req, res, next) => {
  try {
    const decode = res.locals.decode as Decode;
    const user = await userService.findById(decode.id);

    if (user) {
      res.status(200).json({
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
