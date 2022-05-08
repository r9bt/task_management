"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth_controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
exports.authRouter = router;
router.post("/", auth_controller_1.logIn);
router.delete("/", auth_1.auth, auth_controller_1.logOut);
//# sourceMappingURL=auth_router.js.map