import express from "express";
import {
  getUserProfile,
  logIn,
  logout,
  register,
  updateUserProdile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/logIn").post(logIn);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, getUserProfile);
router.route("/updateUserInfo").put(isAuthenticated, updateUserProdile);

export default router;
