"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const error_handler_1 = require("./error/error_handler");
require("dotenv/config");
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(index_1.default);
app.use(error_handler_1.errorHandler);
app.listen(PORT, () => {
    console.log(PORT);
});
//# sourceMappingURL=app.js.map