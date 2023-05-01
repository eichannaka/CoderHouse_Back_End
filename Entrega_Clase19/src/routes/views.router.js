import { Router } from "express";
const router = Router();
router.get("/", (req, res) => {
  res.render("login");
});

router.get("/home", (req, res) => {
  res.render("home");
});

router.get("/register", (req, res) => {
  res.render("registro");
});

router.get("/profile", (req, res) => {
  res.render("profile");
});

router.get("/errorRegistro", (req, res) => {
  res.render("errorRegistro");
});

export default router;
