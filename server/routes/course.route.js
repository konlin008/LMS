import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCousre,
  getCreatorCourses,
} from "../controllers/course.controller.js";

const router = express.Router();

router.route("/createCourse").post(isAuthenticated, createCousre);
router.route("/getCreatorCourses").get(isAuthenticated, getCreatorCourses);

export default router;
