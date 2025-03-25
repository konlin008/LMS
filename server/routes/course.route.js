import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCousre,
  getCreatorCourses,
  updateCourse,
} from "../controllers/course.controller.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/createCourse").post(isAuthenticated, createCousre);
router.route("/getCreatorCourses").get(isAuthenticated, getCreatorCourses);
router
  .route("/updateCourse/:courseId")
  .put(isAuthenticated, upload.single("courseThumbnail"), updateCourse);

export default router;
