import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../authSlice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_AUTH_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
      }),
    }),
    logIn: builder.mutation({
      query: (inputData) => ({
        url: "logIn",
        method: "post",
        body: inputData,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    loadUserProfile: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (formData) => ({
        url: "updateUserInfo",
        method: "PUT",
        body: formData,
        credentials: "include",
      }),
    }),
  }),
});
export default authApi;
export const {
  useRegisterMutation,
  useLogInMutation,
  useLoadUserProfileQuery,
  useUpdateUserProfileMutation,
} = authApi;
