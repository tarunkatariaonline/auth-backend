import { Request, Response } from "express";
import User from "../../Schema/userSchema";
import CustomError from "../../Utils/CustomError";

const updateProfile = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email) {
    throw new CustomError("Fill All the Details !", 400);
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: name,
      email: email,
    },
    {
      new: true,
    }
  ).select("-password");

  res.json({
    message: "Profile updated successfully",
    user: user,
  });
};

export default updateProfile;
