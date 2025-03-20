import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
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
    }),
  }),
});

export const { useCreateCourseMutation } = courseApi;
