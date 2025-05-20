import { Course } from "../model/course.model.js";
import { Lecture } from "../model/lecture.model.js";
import { deleteMedia, deleteVideo, uploadMedia } from "../utils/cloudinary.js";

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
export const searchedCourse = async (req, res) => {
  try {
    let { query = "", categories = [], sortByPrice = "" } = req.query;
    if (typeof categories === "string") {
      categories = [categories];
    }

    const baseCriteria = { isPublished: true };

    const orConditions = [
      { courseTitle: { $regex: query, $options: "i" } },
      { courseSubTitle: { $regex: query, $options: "i" } },
      { category: { $regex: query, $options: "i" } },
    ];

    const andConditions = [baseCriteria, { $or: orConditions }];

    if (categories.length > 0) {
      andConditions.push({
        category: {
          $in: categories.map((cat) => new RegExp(cat, "i")),
        },
      });
    }

    const searchCriteria = { $and: andConditions };

    const sortOptions = {};
    if (sortByPrice === "low") {
      sortOptions.coursePrice = 1;
    } else if (sortByPrice === "high") {
      sortOptions.coursePrice = -1;
    }

    const courses = await Course.find(searchCriteria)
      .populate({ path: "creator", select: "name photoUrl" })
      .sort(sortOptions);

    return res.status(200).json({
      success: true,
      courses: courses || [],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error searching courses",
      error: error.message,
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
    const course = await Course.findById(courseId);
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
export const getPublishedCourse = async (_, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate({
      path: "creator",
      select: "name photoUrl",
    });
    if (!courses) {
      return res.status(404).json({
        msg: "No Published Course Found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Faild To Get Published Course",
      success: false,
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
export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    const { courseId, lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        msg: "Lecture Not Found",
        success: false,
      });
    }
    if (lectureTitle) lecture.title = lectureTitle;
    if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
    if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
    if (isPreviewFree) lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    const course = await Course.findById(courseId);
    if (course && !course.lecture.includes(lecture._id)) {
      course.lecture.push(lecture._id);
      await course.save();
    }
    return res.status(200).json({
      msg: "Lecture Update Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      msg: "Faild to Update Lecture",
    });
  }
};
export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    if (!lectureId) {
      return res.status(404).json({
        success: false,
        msg: "Lecture not Found",
      });
    }
    const lecture = await Lecture.findByIdAndDelete(lectureId);

    if (lecture.publicId) {
      await deleteVideo(lecture.publicId);
    }

    await Course.updateOne(
      { lecture: lectureId },
      { $pull: { lecture: lectureId } }
    );

    return res.status(200).json({
      msg: "Lecture Removed SuccessFully ",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Lecture Not Removed  ",
    });
  }
};
export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        msg: "Lecture Not Found",
      });
    }
    return res.status(200).json({
      msg: "Lecture Found",
      lecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Intrenal Server Error  ",
    });
  }
};

export const toggelPublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query;
    console.log(courseId);
    const course = await Course.findById(courseId);
    if (!courseId) {
      return res.status(404).json({
        msg: "Course Not Found",
        success: false,
      });
    }
    course.isPublished = publish === "true";
    await course.save();

    const statusMessage = course.isPublished ? "Published" : "Unpublished";
    return res.status(200).json({
      msg: `Course Is ${statusMessage}`,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      success: false,
    });
  }
};
