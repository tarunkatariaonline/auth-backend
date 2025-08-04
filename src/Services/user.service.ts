import { NextFunction, Request, Response } from "express";
import CustomError from "../Utils/CustomError";
import User from "../Schema/user.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { IUserReq } from "../Types/user.types";

const register = async ({
  name,
  email,
  password,
  confirmPassword,
}: IUserReq): Promise<any> => {};
