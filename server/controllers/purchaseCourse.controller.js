import Stripe from "stripe";
import { Course } from "../model/course.model.js";
import { PurchaseCourse } from "../model/purchaseCourse.model.js";
import { User } from "../model/user.model.js";
import { Lecture } from "../model/lecture.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const chackOutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        msg: "Course Not Found",
      });
    }

    const newPurchase = new PurchaseCourse({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.courseTitle,
              images: [course.courseThumbnail],
            },
            unit_amount: course.coursePrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/course-progress/${courseId}`,
      cancel_url: `${process.env.FRONTEND_URL}/course-details/${courseId}`,
      metadata: {
        courseId: courseId,
        userId: userId,
      },
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
    });

    if (!session.url) {
      return res
        .status(400)
        .json({ success: false, message: "Error while creating session" });
    }

    newPurchase.paymentId = session.id;
    await newPurchase.save();

    return res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      success: false,
    });
  }
};

export const stripeWebhook = async (req, res) => {
  let event;

  try {
    const sig = req.headers["stripe-signature"];
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET;


    event = stripe.webhooks.constructEvent(req.body, sig, secret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    console.log("Event received: checkout.session.completed");

    try {
      const session = event.data.object;
      console.log("Session ID:", session.id);

      await new Promise((res) => setTimeout(res, 1500));

      const purchase = await PurchaseCourse.findOne({
        paymentId: session.id,
      }).populate({ path: "courseId" });

      if (!purchase) {
        console.warn("No purchase found for session ID:", session.id);
        return res.status(404).json({ message: "Purchase not found" });
      }

      console.log("Purchase found:", purchase);

      if (session.amount_total) {
        purchase.amount = session.amount_total / 100;
      }

      purchase.status = "completed";

      if (
        purchase.courseId &&
        Array.isArray(purchase.courseId.lectures) &&
        purchase.courseId.lectures.length > 0
      ) {
        await Lecture.updateMany(
          { _id: { $in: purchase.courseId.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }

      await purchase.save();

      await User.findByIdAndUpdate(
        purchase.userId,
        { $addToSet: { enrolledCourses: purchase.courseId._id } },
        { new: true }
      );

      await Course.findByIdAndUpdate(
        purchase.courseId._id,
        { $addToSet: { enrolledStudent: purchase.userId } },
        { new: true }
      );

      console.log("Purchase marked as completed and DB updated.");
    } catch (error) {
      console.error("Error during webhook processing:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  res.status(200).send();
};

export const getPurchasedCourseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;
    const course = await Course.findById(courseId)
      .populate("creator")
      .populate("lecture");

    if (!course) {
      return res.status(404).json({
        success: false,
        msg: "Course Not Found",
      });
    }
    const purchased = await PurchaseCourse.findOne({ userId, courseId });

    return res.status(200).json({
      course,
      purchased: !!purchased,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Faild Get Purchased Course Status",
    });
  }
};

export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchaseCourse = await PurchaseCourse.find({
      status: "completed",
    }).populate("courseId");
    if (!purchaseCourse) {
      return res.status(404).json({
        purchaseCourse: [],
      });
    }
    return res.status(200).json({
      purchaseCourse,
    });
  } catch (error) {
    console.log(error);
  }
};
