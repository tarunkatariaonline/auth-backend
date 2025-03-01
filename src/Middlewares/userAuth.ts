import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../Schema/userSchema";
import CustomError from "../Utils/CustomError";
declare module "express-serve-static-core" {
  interface Request {
    user?: {
      _id: any;
      name: string;
      email: string;
      role: string;
    };
  }
}
const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization").split(" ")[1];

  if (!token) {
    throw new CustomError("Access Denied", 401);
  }
  const verified = jwt.verify(token, process.env.JWT_SECRET);

  if (!verified || typeof verified !== "object" || !verified.id) {
    throw new CustomError("Invalid Token", 403);
  }

  const user = await User.findById(verified.id).select("-password");
  if (!user) {
    throw new CustomError("User not found", 404);
  }
  req.user = user;
  next();
};

export default userAuth;
