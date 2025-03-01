"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_1 = __importDefault(require("../Controllers/User/register"));
const asyncHandler_1 = __importDefault(require("../Utils/asyncHandler"));
const login_1 = __importDefault(require("../Controllers/User/login"));
const userAuth_1 = __importDefault(require("../Middlewares/userAuth"));
const profile_1 = __importDefault(require("../Controllers/User/profile"));
const changePassword_1 = __importDefault(require("../Controllers/User/changePassword"));
const updateProfile_1 = __importDefault(require("../Controllers/User/updateProfile"));
const forgetPassword_1 = __importDefault(require("../Controllers/User/forgetPassword"));
const router = express_1.default.Router();
router.post("/register", (0, asyncHandler_1.default)(register_1.default));
router.get("/login", (0, asyncHandler_1.default)(login_1.default));
router.get("/profile", (0, asyncHandler_1.default)(userAuth_1.default), (0, asyncHandler_1.default)(profile_1.default));
router.put("/changepassword", (0, asyncHandler_1.default)(userAuth_1.default), (0, asyncHandler_1.default)(changePassword_1.default));
router.put("/updateprofile", (0, asyncHandler_1.default)(userAuth_1.default), (0, asyncHandler_1.default)(updateProfile_1.default));
router.get("/forgetpassword", (0, asyncHandler_1.default)(forgetPassword_1.default.forgetPasswordMailSend));
router.put("/forgetpasswordupdate", (0, asyncHandler_1.default)(forgetPassword_1.default.forgetPasswordUpdate));
exports.default = router;
//# sourceMappingURL=user.routes.js.map