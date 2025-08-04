import CustomError from "../Utils/CustomError";
import { Request, Response, NextFunction } from "express";
const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode || 500).json({
    message: err.message || "Server Error",
  });
};

export default errorHandler;
