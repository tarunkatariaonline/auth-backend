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
const CustomError_1 = __importDefault(require("../../Utils/CustomError"));
const userSchema_1 = __importDefault(require("../../Schema/userSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmPassword) {
        throw new CustomError_1.default("Fill All the Fields !", 401);
    }
    if (newPassword !== confirmPassword) {
        throw new CustomError_1.default("Passwords do not match !", 401);
    }
    let user = yield userSchema_1.default.findById(req.user._id);
    if (!user) {
        throw new CustomError_1.default("User Not Found !", 404);
    }
    const isValidPassword = yield bcrypt_1.default.compare(oldPassword, user.password);
    if (!isValidPassword) {
        throw new CustomError_1.default("Old Password is Incorrect !", 401);
    }
    user.password = yield bcrypt_1.default.hash(newPassword, 12);
    yield userSchema_1.default.findByIdAndUpdate(user._id, user);
    res.status(200).json({
        message: "Password changed successfully",
    });
});
exports.default = changePassword;
//# sourceMappingURL=changePassword.js.map