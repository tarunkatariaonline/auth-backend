"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./Utils/connection");
const user_routes_1 = __importDefault(require("./Routers/user.routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
app.use(body_parser_1.default.json());
const port = 3000;
app.use("/api/v1/user", user_routes_1.default);
app.use("/", (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        message: err.message || "Server Error",
    });
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map