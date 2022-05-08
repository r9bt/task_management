import { Router } from "express";
import { logIn, logOut } from "../controllers/auth_controller";

import { auth } from "../middleware/auth";

const router = Router();

router.post("/", logIn);
router.delete("/", auth, logOut);

export { router as authRouter };
