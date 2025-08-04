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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_schema_1 = __importDefault(require("../Schema/user.schema"));
const CustomError_1 = __importDefault(require("../Utils/CustomError"));
const auth = (authRole) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const role = Array.isArray(authRole) ? authRole : [authRole];
        const token = req.header("Authorization").split(" ")[1];
        if (!token) {
            throw new CustomError_1.default("Access Denied", 401);
        }
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!verified || typeof verified !== "object" || !verified.id) {
            throw new CustomError_1.default("Invalid Token", 403);
        }
        const user = yield user_schema_1.default.findById(verified.id).select("-password");
        if (!user) {
            throw new CustomError_1.default("User not found", 404);
        }
        if (!role.includes(user.role)) {
            throw new CustomError_1.default("Access Denied", 401);
        }
        req.user = user;
        next();
    });
};
exports.default = auth;
//# sourceMappingURL=auth.middleware.js.map