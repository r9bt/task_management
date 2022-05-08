"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user_controllers");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
exports.userRouter = router;
router.get("/", user_controllers_1.fetchAllUsers);
router.post("/", user_controllers_1.register);
router.patch("/:id", user_controllers_1.updateUser);
router.get("/login", auth_1.auth, user_controllers_1.login);
//# sourceMappingURL=user_router.js.map