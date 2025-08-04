"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        message: err.message || "Server Error",
    });
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.middleware.js.map