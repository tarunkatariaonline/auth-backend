import express, { Request, Response } from "express";
import asyncHandler from "../Utils/asyncHandler";
import auth from "../Middlewares/auth.middleware";
import user from "../Controllers/user.controller";
import ROLE from "../Constants/role.constants";
const router = express.Router();

router.post("/register", asyncHandler(user.register));
router.get("/login", asyncHandler(user.login));
router.get(
  "/profile",
  asyncHandler(auth(ROLE.USER)),
  asyncHandler(user.profile)
);
router.put(
  "/changepassword",
  asyncHandler(auth(ROLE.USER)),
  asyncHandler(user.changePassword)
);
router.put(
  "/updateprofile",
  asyncHandler(auth(ROLE.USER)),
  asyncHandler(user.updateProfile)
);

router.get("/forgetpassword", asyncHandler(user.forgetPasswordMailSend));

router.put("/forgetpasswordupdate", asyncHandler(user.forgetPasswordUpdate));

export default router;
