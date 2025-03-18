import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import authApi from "@/features/apis/authApi";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleWare) =>
    defaultMiddleWare().concat(authApi.middleware),
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
