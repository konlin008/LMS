import { Course } from "../model/course.model.js";
import { Lecture } from "../model/lecture.model.js";
import { deleteMedia, uploadMedia } from "../utils/cloudinary.js";

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
export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({
      creator: userId,
    });
    if (!courses) {
      return res.status(404).json({
        courses: [],
        msg: "Course not found",
        success: false,
      });
    }
    return res.status(200).json({
      courses,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
export const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const {
      courseTitle,
      courseSubTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    const thumbnail = req.file;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        msg: "Course not found!",
      });
    }
    let courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMedia(publicId);
      }
      courseThumbnail = await uploadMedia(thumbnail.path);
    }

    const updatedData = {
      courseTitle,
      courseSubTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: courseThumbnail?.secure_url,
    };
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      updatedData,
      {
        new: true,
      }
    );
    return res.status(200).json({
      updatedCourse,
      success: true,
      msg: "Course Updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    if (!courseId) {
      res.status(404).json({
        success: false,
        msg: "error geting the Course Id",
      });
    }
    const course = await findById(courseId);
    if (!course) {
      res.status(404).json({
        msg: "No Course Found",
      });
    }
    res.status(200).json({
      success: false,
      course,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
export const createLecture = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { title, videoUrl } = req.body;

    if (!courseId || !title || !videoUrl) {
      return res.status(400).json({
        success: false,
        msg: "Title and Video URL are required",
      });
    }
    const lecture = await Lecture.create({ title, videoUrl });
    const course = await Course.findById(courseId);
    if (course) {
      course.lecture.push(lecture._id);
      await course.save();
      return res.status(201).json({
        success: true,
        msg: "Lecture created successfully",
        lecture,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
export const getCourseLectures = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId).populate("lecture");
    if (!course) {
      return res.status(404).json({
        success: false,
        msg: "Course not Found",
      });
    }
    return res.status(200).json({
      success: true,
      lectures: course.lecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Faild to get lectures",
    });
  }
};
