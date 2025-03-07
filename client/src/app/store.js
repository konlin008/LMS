import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import authApi from "@/features/apis/authApi";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleWare) =>
    defaultMiddleWare().concat(authApi.middleware),
});
