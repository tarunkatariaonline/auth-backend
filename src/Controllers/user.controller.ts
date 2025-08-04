import { NextFunction, Request, Response } from "express";
import CustomError from "../Utils/CustomError";
import User from "../Schema/user.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { ILoginReq, IRegisterReq } from "../Types/user.types";
import userService from "../Services/user.service";

const register = async (req: Request, res: Response) => {
  const { name, email, password, confirmPassword } = req.body as IRegisterReq;

  if (!name || !email || !password || !confirmPassword) {
    throw new CustomError("Fill All Fields Properly !", 401);
  }

  if (password !== confirmPassword) {
    throw new CustomError("Passwords Do Not Match !", 401);
  }

  const data = await userService.register({
    name,
    email,
    password,
    confirmPassword,
  });

  res.status(201).json({
    message: "Registered Successfully",
    data: data,
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as ILoginReq;

  if (!email || !password) {
    throw new CustomError("Email and password are required !", 401);
  }

  const data = await userService.login({ email, password });
  res.status(200).json({
    message: "Login successfully !",
    data: data,
  });
};

const profile = async (req: Request, res: Response) => {
  res.json({
    message: "User is Authanitcated !",
    user: req.user,
  });
};

const updateProfile = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email) {
    throw new CustomError("Fill All the Details !", 400);
  }
  const data = await userService.updateProfile({
    id: req.user._id,
    name,
    email,
  });
  res.json({
    message: "Profile updated successfully",
    data: data,
  });
};

const changePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmPassword) {
    throw new CustomError("Fill All the Fields !", 401);
  }

  if (newPassword !== confirmPassword) {
    throw new CustomError("Passwords do not match !", 401);
  }

  const id = req.user._id;

  await userService.changePassword({ id, oldPassword, newPassword });

  res.status(200).json({
    message: "Password changed successfully",
  });
};

const forgetPasswordMailSend = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("User Doesn't Exist !", 403);
  }

  const token = crypto.randomBytes(64).toString("hex");
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const resetPasswordTokenExpiration = new Date(Date.now() + 30 * 60 * 1000);
  user.resetPasswordToken = resetPasswordToken;
  user.resetPasswordTokenExpires = resetPasswordTokenExpiration;
  user.save();
  // Facing Some Issue To Send Mail.
  // send the token variable to the mail of the user with frontend URL;
  res.json({
    message: "Mail Send Successfully !",
    user: req.user,
  });
};

const forgetPasswordUpdate = async (req: Request, res: Response) => {
  const token = req.query.token;
  const newPassword = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  if (!token) {
    throw new CustomError("Invalid Token !", 403);
  }

  if (!newPassword || !confirmPassword) {
    throw new CustomError("Password is Required !", 403);
  }

  if (newPassword !== confirmPassword) {
    throw new CustomError("Password Doesn't Match !", 403);
  }
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token as any)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new CustomError("User Not Found !", 400);
  }

  user.password = await bcrypt.hash(newPassword, 12);
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpires = undefined;

  res.json({
    message: "Password Updated Successfully !",
  });
};

export default {
  register,
  login,
  profile,
  updateProfile,
  changePassword,
  forgetPasswordUpdate,
  forgetPasswordMailSend,
};
