import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch_Creator_Course", "Refetch_Lecture"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_COURSE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (CourseDetail) => ({
        url: "createCourse",
        method: "POST",
        body: CourseDetail,
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),

    getCreatorCourse: builder.query({
      query: () => ({
        url: "getCreatorCourses",
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Course"],
    }),
    getPublishedCourses: builder.query({
      query: () => ({
        url: "publishedCourse",
        method: "GET",
      }),
    }),
    editCourse: builder.mutation({
      query: ({ courseId, formData }) => ({
        url: `updateCourse/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    getCourseDetails: builder.query({
      query: (courseId) => ({
        url: `/getCourseById/${courseId}`,
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Course"],
    }),
    createLecture: builder.mutation({
      query: ({ courseId, title, videoUrl }) => ({
        url: `createLecture/${courseId}`,
        method: "POST",
        body: { title, videoUrl },
      }),
    }),
    getCourseLecture: builder.query({
      query: ({ courseId }) => ({
        url: `getCourseLecture/${courseId}`,
        method: "GET",
      }),
      providesTags: ["Refetch_Lecture"],
    }),
    editLecture: builder.mutation({
      query: ({
        courseId,
        lectureId,
        lectureTitle,
        videoInfo,
        isPreviewFree,
      }) => ({
        url: `/editLecture/${courseId}/lectuer/${lectureId}`,
        method: "POST",
        body: { lectureTitle, videoInfo, isPreviewFree },
      }),
    }),
    removeLecture: builder.mutation({
      query: ({ lectureId }) => ({
        url: `/removeLecture/lectuer/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Lecture"],
    }),
    getLecture: builder.query({
      query: ({ lectureId }) => ({
        url: `/getLecture/lectuer/${lectureId}`,
        method: "GET",
      }),
    }),
    publishCourse: builder.mutation({
      query: ({ courseId, query }) => ({
        url: `/togglePublish/${courseId}?publish=${query}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCreatorCourseQuery,
  useGetPublishedCoursesQuery,
  useEditCourseMutation,
  useGetCourseDetailsQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureQuery,
  usePublishCourseMutation,
} = courseApi;
