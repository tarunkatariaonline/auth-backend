import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../Schema/user.schema";
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
const auth = (authRole: string | string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const role = Array.isArray(authRole) ? authRole : [authRole];
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
    if (!role.includes(user.role)) {
      throw new CustomError("Access Denied", 401);
    }
    req.user = user;
    next();
  };
};

export default auth;
