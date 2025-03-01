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
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    if (!name || !email) {
        throw new CustomError_1.default("Fill All the Details !", 400);
    }
    const user = yield userSchema_1.default.findByIdAndUpdate(req.user._id, {
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
exports.default = updateProfile;
//# sourceMappingURL=updateProfile.js.map