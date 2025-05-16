import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseProgressApi = createApi({
  reducerPath: "courseProgressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_PROGRESS_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCourseProgress: builder.query({
      query: ({ courseId }) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
    }),
    lectureProgress: builder.mutation({
      query: ({ courseId, lectureId }) => ({
        url: `/${courseId}/lecture/${lectureId}`,
        method: "POST",
      }),
    }),
    markAsComplete: builder.mutation({
      query: ({ courseId }) => ({
        url: `/${courseId}/complete`,
        method: "POST",
      }),
    }),
    markAsIncomplete: builder.mutation({
      query: ({ courseId }) => ({
        url: `/${courseId}/incomplete`,
        method: "POST",
      }),
    }),
  }),
});
export const {
  useGetCourseProgressQuery,
  useLectureProgressMutation,
  useMarkAsCompleteMutation,
  useMarkAsIncompleteMutation,
} = courseProgressApi;
