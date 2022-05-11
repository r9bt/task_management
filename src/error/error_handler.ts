import { ErrorRequestHandler } from "express";
import CustomError from "./error";

export const errorHandler: ErrorRequestHandler = (
  err: CustomError,
  req,
  res,
  next
) => {
  res
    .status(err.status || 500)
    .json({ status: err.status, message: err.message });
};
