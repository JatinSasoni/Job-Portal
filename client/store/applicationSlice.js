import { createSlice } from "@reduxjs/toolkit";

//INITIAL STATE FOR JOB SLICE
const initialState = {
  allApplicants: [],
};

//applicationSlice
const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    //--ACTIONS
    setApplicants: (state, action) => {
      state.allApplicants = action.payload;
    },
  },
});

export const { setApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;
