import { Router } from "express";
import {
  createAccount,
  getAccount,
  updateAccount,
} from "../controllers/account_controllers";
import { accessToken } from "../middleware/access_token";

const router = Router();

router.get("/", accessToken, getAccount);
router.post("/", createAccount);
router.patch("/profile", accessToken, updateAccount);

export { router as accountRouter };
