import { Request, Response } from "express";
import CustomError from "../../Utils/CustomError";
import User from "../../Schema/userSchema";
import bcrypt from "bcrypt";
const changePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmPassword) {
    throw new CustomError("Fill All the Fields !", 401);
  }

  if (newPassword !== confirmPassword) {
    throw new CustomError("Passwords do not match !", 401);
  }
  let user = await User.findById(req.user._id);
  if (!user) {
    throw new CustomError("User Not Found !", 404);
  }
  const isValidPassword = await bcrypt.compare(oldPassword, user.password);
  if (!isValidPassword) {
    throw new CustomError("Old Password is Incorrect !", 401);
  }

  user.password = await bcrypt.hash(newPassword, 12);
  await User.findByIdAndUpdate(user._id, user);

  res.status(200).json({
    message: "Password changed successfully",
  });
};

export default changePassword;
