import express, { application } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  chackOutSession,
  getAllPurchasedCourse,
  getPurchasedCourseStatus,
  stripeWebhook,
} from "../controllers/purchaseCourse.controller.js";
const router = express.Router();

router
  .route("/checkout/create-checkout-session")
  .post(isAuthenticated, chackOutSession);
router
  .route("/webhook")
  .post(express.raw({ type: "application/json" }), stripeWebhook);
router
  .route("/course/:courseId/detail-with-status")
  .get(isAuthenticated, getPurchasedCourseStatus);

router.route("/allPurchasedCourse").get(getAllPurchasedCourse);

export default router;
