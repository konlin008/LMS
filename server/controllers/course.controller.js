import { Course } from "../model/course.model.js";

export const createCousre = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        success: false,
        msg: "All Fields Are Required",
      });
    }
    const newCourse = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });
    return res.status(200).json({
      success: true,
      msg: "Course Created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
