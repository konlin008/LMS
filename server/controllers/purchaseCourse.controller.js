import Stripe from "Stripe";
import { Course } from "../model/course.model.js";
import { PurchaseCourse } from "../model/purchaseCourse.model.js";

const stripe = new Stripe(process.env.STRIP_SECRET_KEY);

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
    // Create a Stripe checkout session
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
            unit_amount: course.coursePrice * 100, // Amount in paise (lowest denomination)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/course-progress/${courseId}`, // once payment successful redirect to course progress page
      cancel_url: `http://localhost:5173/course-detail/${courseId}`,
      metadata: {
        courseId: courseId,
        userId: userId,
      },
      shipping_address_collection: {
        allowed_countries: ["IN"], // Optionally restrict allowed countries
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
      url: session.url, // Return the Stripe checkout URL
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      success: false,
    });
  }
};
