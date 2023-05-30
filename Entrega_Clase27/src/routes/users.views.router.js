import { Router } from "express";
import {
  login,
  register,
  profile,
} from "../services/db/controllers/users.views.controller.js";

const router = Router();

router.get("/login", login);

router.get("/register", register);

router.get("/", profile);

export default router;
