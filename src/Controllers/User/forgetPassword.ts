import { Request, Response } from "express";
import User from "../../Schema/userSchema";
import sendMail from "../../Utils/nodemailer";
import CustomError from "../../Utils/CustomError";
import crypto from "crypto";
import bcrypt from "bcrypt";
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
export default { forgetPasswordMailSend, forgetPasswordUpdate };
