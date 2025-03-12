import express from "express";
import {
  getUserProfile,
  logIn,
  logout,
  register,
} from "../controlers/user.controler.js";
import isAuthenticated from "../middlwwares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/logIn").post(logIn);
router.route("/logout").get(logout);
router.route("profile").get(isAuthenticated, getUserProfile);

export default router;
