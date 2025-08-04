"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = __importDefault(require("../Utils/asyncHandler"));
const auth_middleware_1 = __importDefault(require("../Middlewares/auth.middleware"));
const user_controller_1 = __importDefault(require("../Controllers/user.controller"));
const role_constants_1 = __importDefault(require("../Constants/role.constants"));
const router = express_1.default.Router();
router.post("/register", (0, asyncHandler_1.default)(user_controller_1.default.register));
router.get("/login", (0, asyncHandler_1.default)(user_controller_1.default.login));
router.get("/profile", (0, asyncHandler_1.default)((0, auth_middleware_1.default)(role_constants_1.default.USER)), (0, asyncHandler_1.default)(user_controller_1.default.profile));
router.put("/changepassword", (0, asyncHandler_1.default)((0, auth_middleware_1.default)(role_constants_1.default.USER)), (0, asyncHandler_1.default)(user_controller_1.default.changePassword));
router.put("/updateprofile", (0, asyncHandler_1.default)((0, auth_middleware_1.default)(role_constants_1.default.USER)), (0, asyncHandler_1.default)(user_controller_1.default.updateProfile));
router.get("/forgetpassword", (0, asyncHandler_1.default)(user_controller_1.default.forgetPasswordMailSend));
router.put("/forgetpasswordupdate", (0, asyncHandler_1.default)(user_controller_1.default.forgetPasswordUpdate));
exports.default = router;
//# sourceMappingURL=user.routes.js.map