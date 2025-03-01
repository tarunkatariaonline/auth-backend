import { NextFunction, Request, Response } from "express";
import CustomError from "../../Utils/CustomError";
import User from "../../Schema/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const register = async (req: Request, res: Response) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    throw new CustomError("Fill All Fields Properly !", 401);
  }

  if (password !== confirmPassword) {
    throw new CustomError("Passwords Do Not Match !", 401);
  }

  const existUser = await User.findOne({ email });

  if (existUser) {
    throw new CustomError("Email Already Exist !", 401);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  user.password = null;
  res.status(201).json({
    message: "Registered Successfully",
    user: user,
    token: token,
  });
};

export default register;
