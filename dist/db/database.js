"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const promise_1 = require("mysql2/promise");
require("dotenv/config");
exports.db = (0, promise_1.createPool)({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
//# sourceMappingURL=database.js.map