import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCousre,
  createLecture,
  editLecture,
  getCourseById,
  getCourseLectures,
  getCreatorCourses,
  getLectureById,
  getPublishedCourse,
  removeLecture,
  toggelPublishCourse,
  updateCourse,
} from "../controllers/course.controller.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/createCourse").post(isAuthenticated, createCousre);
router.route("/getCreatorCourses").get(isAuthenticated, getCreatorCourses);
router.route("/publishedCourse").get( getPublishedCourse);
router
  .route("/updateCourse/:courseId")
  .put(isAuthenticated, upload.single("courseThumbnail"), updateCourse);
router.route("/getCourseById/:courseId").get(isAuthenticated, getCourseById);
router.route("/createLecture/:courseId").post(isAuthenticated, createLecture);
router
  .route("/getCourseLecture/:courseId")
  .get(isAuthenticated, getCourseLectures);

router
  .route("/editLecture/:courseId/lectuer/:lectureId")
  .post(isAuthenticated, editLecture);
router
  .route("/removeLecture/lectuer/:lectureId")
  .delete(isAuthenticated, removeLecture);
router
  .route("/getLecture/lectuer/:lectureId")
  .get(isAuthenticated, getLectureById);

router
  .route("/togglePublish/:courseId")
  .put(isAuthenticated, toggelPublishCourse);
export default router;
