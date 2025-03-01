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
const bcrypt_1 = __importDefault(require("bcrypt"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new CustomError_1.default("Email and password are required !", 401);
    }
    const user = yield userSchema_1.default.findOne({ email });
    if (!user) {
        throw new CustomError_1.default("User not found !", 404);
    }
    const passwordResult = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordResult) {
        throw new CustomError_1.default("Invalid password !", 401);
    }
    res.status(200).json({
        message: "Login successfully !",
    });
});
exports.default = login;
//# sourceMappingURL=login.controller.js.map