import mongoose from "mongoose";
const lectureProgressSchema = new mongoose.Schema({
  lectureId: {
    type: String,
    required: true,
  },
  viewed: {
    type: Boolean,
    required: true,
  },
});

const courseProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },  
    courseId: {
      type: String,
      required: true,
    },
    completed: { type: Boolean },
    lectureProgress: [lectureProgressSchema],
  },
  { timestamps: true }
);

export const CourseProgress = mongoose.model(
  "CourseProgress",
  courseProgressSchema
);
