import express from "express";
import { logIn, register } from "../controlers/user.controler.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/logIn").post(logIn);

export default router;
