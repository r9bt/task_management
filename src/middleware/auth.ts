import { Request, RequestHandler } from "express";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import CustomError from "../error/error";

export type Decode = {
  id: number;
};

export const auth: RequestHandler = (req, res, next) => {
  try {
    const token = _getToken(req);
    if (!token) return next(new CustomError(400, "tokenがありませんでした。"));
    const decode = jwt.verify(token, process.env.JWT_SECRET) as Decode;
    if (!decode)
      return next(new CustomError(400, "tokenが一致しませんでした。"));
    res.locals.decode = decode;
    next();
  } catch (e: unknown) {
    console.log(e);
    next(new CustomError(400, "tokenエラー"));
  }
};

const _getToken = (req: Request): string | undefined => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
};
