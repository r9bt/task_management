import { Request, RequestHandler } from "express";
import * as jwt from "jsonwebtoken";
import "dotenv/config";

export type Decode = {
  id: number;
};

export const auth: RequestHandler = (req, res, next) => {
  const token = _getToken(req);
  if (!token) return next();
  try {
    res.locals.decode = jwt.verify(token, process.env.JWT_SECRET) as Decode;
    next();
  } catch (e: unknown) {
    if (e instanceof jwt.TokenExpiredError) {
      console.error("トークンの有効期限が切れています。", e);
    } else if (e instanceof jwt.JsonWebTokenError) {
      console.error("トークンが不正です。", e);
    } else {
      console.error("トークンの検証でその他のエラーが発生しました。", e);
    }
    throw e;
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
