import { Router } from "express";
import { logIn, logOut } from "../controllers/auth_controller";

import { accessToken } from "../middleware/access_token";

const router = Router();

router.post("/", logIn);
router.delete("/", accessToken, logOut);

export { router as authRouter };
