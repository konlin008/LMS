import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const purchaseApi = createApi({
  reducerPath: purchaseApi,
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_COURSE_API,
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
  }),
});

export const { useCreateCheckMutation } = purchaseApi;
