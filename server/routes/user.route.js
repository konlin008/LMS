import express from "express";
import {
  getUserProfile,
  logIn,
  logout,
  register,
  updateUserProdile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/logIn").post(logIn);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, getUserProfile);
router
  .route("/updateUserInfo")
  .put(isAuthenticated, upload.single("profilePhoto"), updateUserProdile);

export default router;
