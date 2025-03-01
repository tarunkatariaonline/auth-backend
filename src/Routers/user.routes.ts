import express, { Request, Response } from "express";
import register from "../Controllers/User/register";
import asyncHandler from "../Utils/asyncHandler";
import login from "../Controllers/User/login";
import userAuth from "../Middlewares/userAuth";
import profile from "../Controllers/User/profile";
import changePassword from "../Controllers/User/changePassword";
import updateProfile from "../Controllers/User/updateProfile";
import forgetPassword from "../Controllers/User/forgetPassword";
const router = express.Router();

router.post("/register", asyncHandler(register));
router.get("/login", asyncHandler(login));
router.get("/profile", asyncHandler(userAuth), asyncHandler(profile));
router.put(
  "/changepassword",
  asyncHandler(userAuth),
  asyncHandler(changePassword)
);
router.put(
  "/updateprofile",
  asyncHandler(userAuth),
  asyncHandler(updateProfile)
);

router.get(
  "/forgetpassword",
  asyncHandler(forgetPassword.forgetPasswordMailSend)
);

router.put(
  "/forgetpasswordupdate",
  asyncHandler(forgetPassword.forgetPasswordUpdate)
);

export default router;
