import { createSlice } from "@reduxjs/toolkit";

//INITIAL STATE FOR AUTHSLICE
const initialState = {
  loading: false,
  loggedIn: null,
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
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
});

//EXPORTING REDUCERS/ACTION TO USE IN DIFFERENT COMPONENTS
export const { setLoading, setLoggedIn } = authSlice.actions;

//EXPORTING AUTHSLICE'S ALL REDUCERS TO SPECIFY REDUX STORE
export default authSlice.reducer;
