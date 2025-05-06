import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import authApi from "@/features/apis/authApi";
import { courseApi } from "@/features/apis/courseApi";
import { purchaseApi } from "@/features/apis/purchaseApi";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleWare) =>
    defaultMiddleWare().concat(
      authApi.middleware,
      courseApi.middleware,
      purchaseApi.middleware
    ),
});

const initializeApp = async () => {
  try {
    await appStore.dispatch(
      authApi.endpoints.loadUserProfile.initiate({}, { forceRefetch: true })
    );
  } catch (error) {
    console.error("Failed to load user profile:", error);
  }
};
initializeApp();
