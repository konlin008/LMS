import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_PURCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCheck: builder.mutation({
      query: ({ courseId }) => ({
        url: "/checkout/create-checkout-session",
        method: "POST",
        body: courseId,
      }),
    }),
    getCourseStatus: builder.query({
      query: ({ courseId }) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),
    getAllPurchasedCourse: builder.query({
      query: () => ({
        url: "/allPurchasedCourse",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCheckMutation,
  useGetCourseStatusQuery,
  useGetAllPurchasedCourseQuery,
} = purchaseApi;
