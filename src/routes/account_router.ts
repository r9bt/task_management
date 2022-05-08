import { Router } from "express";
import {
  createAccount,
  getAccount,
  updateAccount,
} from "../controllers/account_controllers";
import { auth } from "../middleware/auth";

const router = Router();

router.get("/", auth, getAccount);
router.post("/", createAccount);
router.patch("/profile", auth, updateAccount);

export { router as accountRouter };
