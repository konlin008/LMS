import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getCourseProgress,
  markAsCompleted,
  markAsIncompleted,
  updateLectureProgress,
} from "../controllers/courseProgress.controller.js";

const router = express.Router();

router.route("/:courseId").get(isAuthenticated, getCourseProgress);
router
  .route("/:courseId/lecture/:lectureId")
  .post(isAuthenticated, updateLectureProgress);

router.route("/:courseId/complete").post(isAuthenticated, markAsCompleted);
router.route("/:courseId/incomplete").post(isAuthenticated, markAsIncompleted);

export default router;
