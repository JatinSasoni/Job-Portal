import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

//CONFIGURING REDUX STORE
export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
