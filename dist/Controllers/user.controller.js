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
const CustomError_1 = __importDefault(require("../Utils/CustomError"));
const user_schema_1 = __importDefault(require("../Schema/user.schema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
        throw new CustomError_1.default("Fill All Fields Properly !", 401);
    }
    if (password !== confirmPassword) {
        throw new CustomError_1.default("Passwords Do Not Match !", 401);
    }
    const existUser = yield user_schema_1.default.findOne({ email });
    if (existUser) {
        throw new CustomError_1.default("Email Already Exist !", 401);
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 12);
    const user = yield user_schema_1.default.create({
        name,
        email,
        password: hashedPassword,
    });
    const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
    user.password = null;
    res.status(201).json({
        message: "Registered Successfully",
        user: user,
        token: token,
    });
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new CustomError_1.default("Email and password are required !", 401);
    }
    const user = yield user_schema_1.default.findOne({ email });
    if (!user) {
        throw new CustomError_1.default("User not found !", 404);
    }
    const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
    if (!isValidPassword) {
        throw new CustomError_1.default("Invalid password !", 401);
    }
    user.password = null;
    const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({
        message: "Login successfully !",
        user: user,
        token,
    });
});
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        message: "User is Authanitcated !",
        user: req.user,
    });
});
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    if (!name || !email) {
        throw new CustomError_1.default("Fill All the Details !", 400);
    }
    const user = yield user_schema_1.default.findByIdAndUpdate(req.user._id, {
        name: name,
        email: email,
    }, {
        new: true,
    }).select("-password");
    res.json({
        message: "Profile updated successfully",
        user: user,
    });
});
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmPassword) {
        throw new CustomError_1.default("Fill All the Fields !", 401);
    }
    if (newPassword !== confirmPassword) {
        throw new CustomError_1.default("Passwords do not match !", 401);
    }
    let user = yield user_schema_1.default.findById(req.user._id);
    if (!user) {
        throw new CustomError_1.default("User Not Found !", 404);
    }
    const isValidPassword = yield bcrypt_1.default.compare(oldPassword, user.password);
    if (!isValidPassword) {
        throw new CustomError_1.default("Old Password is Incorrect !", 401);
    }
    user.password = yield bcrypt_1.default.hash(newPassword, 12);
    yield user_schema_1.default.findByIdAndUpdate(user._id, user);
    res.status(200).json({
        message: "Password changed successfully",
    });
});
const forgetPasswordMailSend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield user_schema_1.default.findOne({ email });
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
    const user = yield user_schema_1.default.findOne({
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
exports.default = {
    register,
    login,
    profile,
    updateProfile,
    changePassword,
    forgetPasswordUpdate,
    forgetPasswordMailSend,
};
//# sourceMappingURL=user.controller.js.map