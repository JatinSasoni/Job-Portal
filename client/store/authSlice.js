import { createSlice } from "@reduxjs/toolkit";

//INITIAL STATE FOR AUTHSLICE
const initialState = {
  loading: false,
};

//CREATING AUTH SLICE FOR LOADING AND FINDING OUT IS USER LOGGED IN
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

//EXPORTING REDUCERS/ACTION TO USE IN DIFFERENT COMPONENTS
export const { setLoading } = authSlice.actions;

//EXPORTING AUTHSLICE'S ALL REDUCERS TO SPECIFY REDUX STORE
export default authSlice.reducer;
