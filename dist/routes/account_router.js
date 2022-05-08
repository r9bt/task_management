"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRouter = void 0;
const express_1 = require("express");
const account_controllers_1 = require("../controllers/account_controllers");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
exports.accountRouter = router;
router.get("/", auth_1.auth, account_controllers_1.getAccount);
router.post("/", account_controllers_1.createAccount);
router.patch("/profile", auth_1.auth, account_controllers_1.updateAccount);
//# sourceMappingURL=account_router.js.map