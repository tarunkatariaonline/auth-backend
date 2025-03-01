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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
        throw new CustomError_1.default("Fill All Fields Properly !", 401);
    }
    if (password !== confirmPassword) {
        throw new CustomError_1.default("Passwords Do Not Match !", 401);
    }
    const existUser = yield userSchema_1.default.findOne({ email });
    if (existUser) {
        throw new CustomError_1.default("Email Already Exist !", 401);
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 12);
    const user = yield userSchema_1.default.create({
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
exports.default = register;
//# sourceMappingURL=register.js.map