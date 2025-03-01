import { Request, Response } from "express";
import User from "../../Schema/userSchema";
import CustomError from "../../Utils/CustomError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError("Email and password are required !", 401);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError("User not found !", 404);
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new CustomError("Invalid password !", 401);
  }

  user.password = null;
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.status(200).json({
    message: "Login successfully !",
    user: user,
    token,
  });
};

export default login;
