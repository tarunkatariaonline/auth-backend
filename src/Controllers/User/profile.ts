import { Request, Response } from "express";

const profile = async (req: Request, res: Response) => {
  res.json({
    message: "User is Authanitcated !",
    user: req.user,
  });
};

export default profile;
