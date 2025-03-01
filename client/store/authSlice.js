import { createSlice } from "@reduxjs/toolkit";

//INITIAL STATE FOR AUTHSLICE
const initialState = {
  loading: false,
  loggedInUser: null,
  isDarkMode: false,
};

//CREATING AUTH SLICE FOR LOADING AND FINDING OUT IS USER LOGGED IN
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //ACTIONS!
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode; // Toggle dark mode
    },
  },
});

//EXPORTING REDUCERS/ACTION TO USE IN DIFFERENT COMPONENTS
export const { setLoading, setLoggedInUser, toggleDarkMode } =
  authSlice.actions;

//EXPORTING AUTHSLICE'S ALL REDUCERS TO SPECIFY REDUX STORE
export default authSlice.reducer;
