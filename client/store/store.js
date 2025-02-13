import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";

//CONFIGURING REDUX STORE
export const store = configureStore({
  reducer: {
    auth: authSlice,
    job: jobSlice,
  },
});
