import express, { Request, Response } from "express";
import asyncHandler from "../Utils/asyncHandler";
import userAuth from "../Middlewares/userAuth";
import user from "../Controllers/user.controller";
const router = express.Router();

router.post("/register", asyncHandler(user.register));
router.get("/login", asyncHandler(user.login));
router.get("/profile", asyncHandler(userAuth), asyncHandler(user.profile));
router.put(
  "/changepassword",
  asyncHandler(userAuth),
  asyncHandler(user.changePassword)
);
router.put(
  "/updateprofile",
  asyncHandler(userAuth),
  asyncHandler(user.updateProfile)
);

router.get("/forgetpassword", asyncHandler(user.forgetPasswordMailSend));

router.put("/forgetpasswordupdate", asyncHandler(user.forgetPasswordUpdate));

export default router;
