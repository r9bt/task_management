"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const index_1 = require("./routes/index");
const error_handler_1 = require("./error/error_handler");
require("dotenv/config");
const app = express();
const PORT = Number(process.env.PORT) || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(index_1.default);
app.use(error_handler_1.errorHandler);
app.listen(PORT, () => {
    console.log("Server is up on port " + PORT);
});
//# sourceMappingURL=app.js.map