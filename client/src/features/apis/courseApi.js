import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch_Creator_Course"],
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
  }),
});

export const { useCreateCourseMutation, useGetCreatorCourseQuery } = courseApi;
