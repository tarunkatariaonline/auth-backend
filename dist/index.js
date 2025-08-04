"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./Config/db.config");
const user_routes_1 = __importDefault(require("./Routers/user.routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const errorHandler_middleware_1 = __importDefault(require("./Middlewares/errorHandler.middleware"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const port = 3000;
app.use("/api/v1/user", user_routes_1.default);
app.use("/", errorHandler_middleware_1.default);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map