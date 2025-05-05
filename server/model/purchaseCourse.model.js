import mongoose from "mongoose";

const purchaseCoursesSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      require: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    status: {
      type: String,
      enum: ["prnding", "completed", "failed"],
      default: "pending",
    },
    paymentId: {
      type: String,
    },
  },
  { timestamps: true }
);
export const PurchaseCourse = mongoose.model(
  "PurchaseCourse",
  purchaseCoursesSchema
);
