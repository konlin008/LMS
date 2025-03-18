import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCousre } from "../controllers/course.controller.js";

const router = express.Router();

router.route("/createCourse").post(isAuthenticated, createCousre);

export default router;
