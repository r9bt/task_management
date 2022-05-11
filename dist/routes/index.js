"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_router_1 = require("./task_router");
const auth_router_1 = require("./auth_router");
const account_router_1 = require("./account_router");
const routers = (0, express_1.Router)();
routers.use("/tasks", task_router_1.taskRouter);
routers.use("/auth", auth_router_1.authRouter);
routers.use("/account", account_router_1.accountRouter);
exports.default = routers;
//# sourceMappingURL=index.js.map