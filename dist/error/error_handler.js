"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({ status: err.status, message: err.message });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error_handler.js.map