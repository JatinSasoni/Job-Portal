import { createSlice } from "@reduxjs/toolkit";

//INITIAL STATE FOR JOB SLICE
const initialState = {
  allJobs: [],
  singleJobData: [],
  allAdminJobs: [],
  allAppliedJobs: [],
};

//JOB SLICE
const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    //--ACTIONS
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJobData: (state, action) => {
      state.singleJobData = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
  },
});

//EXPORTING REDUCERS/ACTION TO USE IN DIFFERENT COMPONENTS
export const {
  setAllJobs,
  setSingleJobData,
  setAllAdminJobs,
  setAllAppliedJobs,
} = jobSlice.actions;

//EXPORTING JOBSLICE'S ALL REDUCERS TO SPECIFY REDUX STORE
export default jobSlice.reducer;
