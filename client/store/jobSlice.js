import { createSlice } from "@reduxjs/toolkit";

//INITIAL STATE FOR JOB SLICE
const initialState = {
  allJobs: [],
  singleJobData: [],
  allAdminJobs: [],
  allAppliedJobs: [],
  searchedQuery: "",
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
    setSearchQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
  },
});

//EXPORTING REDUCERS/ACTION TO USE IN DIFFERENT COMPONENTS
export const {
  setAllJobs,
  setSingleJobData,
  setAllAdminJobs,
  setAllAppliedJobs,
  setSearchQuery,
} = jobSlice.actions;

//EXPORTING JOBSLICE'S ALL REDUCERS TO SPECIFY REDUX STORE
export default jobSlice.reducer;
