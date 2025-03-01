"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userSchema_1 = __importDefault(require("../../Schema/userSchema"));
const CustomError_1 = __importDefault(require("../../Utils/CustomError"));
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const forgetPasswordMailSend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield userSchema_1.default.findOne({ email });
    if (!user) {
        throw new CustomError_1.default("User Doesn't Exist !", 403);
    }
    const token = crypto_1.default.randomBytes(64).toString("hex");
    const resetPasswordToken = crypto_1.default
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
});
const forgetPasswordUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.query.token;
    const newPassword = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if (!token) {
        throw new CustomError_1.default("Invalid Token !", 403);
    }
    if (!newPassword || !confirmPassword) {
        throw new CustomError_1.default("Password is Required !", 403);
    }
    if (newPassword !== confirmPassword) {
        throw new CustomError_1.default("Password Doesn't Match !", 403);
    }
    const resetPasswordToken = crypto_1.default
        .createHash("sha256")
        .update(token)
        .digest("hex");
    const user = yield userSchema_1.default.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
        throw new CustomError_1.default("User Not Found !", 400);
    }
    user.password = yield bcrypt_1.default.hash(newPassword, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpires = undefined;
    res.json({
        message: "Password Updated Successfully !",
    });
});
exports.default = { forgetPasswordMailSend, forgetPasswordUpdate };
//# sourceMappingURL=forgetPassword.js.map