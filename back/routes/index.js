import { Router } from "express";
import { login, logout, refresh, register } from "../controllers/authController.js";

const router = Router();

router.post("/login", login);
router.get("/logout", logout);
router.get("/refresh", refresh);
router.post("/register", register);

export default router;
