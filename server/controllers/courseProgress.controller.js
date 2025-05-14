import { Course } from "../model/course.model.js";
import { CourseProgress } from "../model/courseProgress.model.js";

export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.id;

    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    });
    const courseDetails = await Course.findById(courseId);
    if (!courseDetails) {
      return res.status(404).json({
        msg: "Course not found",
        success: false,
      });
    }
    if (!courseProgress) {
      return res.status(200).json({
        data: {
          courseDetails,
          progress: [],
          completed: false,
        },
      });
    }
    return res.status(200).json({
      data: {
        courseDetails,
        progress: courseProgress.lectureProgress,
        completed: courseProgress.completed,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};
export const updateLectureProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const { userId } = req.id;
    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    });
    if (!courseProgress) {
      courseProgress = new CourseProgress({
        userId,
        courseId,
        completed: false,
        lectureProgress: [],
      });
    }
    const lectureIndex = courseProgress.lectureProgress.findIndex(
      (lecture) => lecture.lectureId.toString() === lectureId
    );
    if (lectureIndex !== -1) {
      courseProgress.lectureProgress[lectureIndex].viewed = true;
    } else {
      courseProgress.lectureProgress.push({
        lectureId,
        viewed: true,
      });
    }
    const viewedLectures = courseProgress.lectureProgress.filter(
      (lectureProg) => lectureProg.viewed
    );
    const course = await Course.findById(courseId);

    if (course.lecture.length === viewedLectures.length) {
      courseProgress.completed = true;
    }
    await courseProgress.save();
    return res.status(200).json({
      msg: "Course Progress Update Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Faild To Update Course Progress",
    });
  }
};
