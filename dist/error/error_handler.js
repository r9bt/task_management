"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res) => {
    res.json({ message: err.message });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error_handler.js.map