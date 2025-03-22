import { createSlice } from "@reduxjs/toolkit";
import {
  DEFAULT_PAGE_LIMIT,
  DEFAULT_PAGE_LIMIT_BROWSE,
  DEFAULT_PAGE_NUMBER,
} from "../util/Constants";

//INITIAL STATE FOR JOB SLICE
const initialState = {
  allJobs: [],
  paginationData: {
    allJobsPage: {
      page: DEFAULT_PAGE_NUMBER || 1,
      limit: DEFAULT_PAGE_LIMIT || 8,
      totalPage: 1, //DEFAULT
    },
    browseJobsPage: {
      page: DEFAULT_PAGE_NUMBER || 1,
      limit: DEFAULT_PAGE_LIMIT_BROWSE || 20,
      totalPage: 1, //DEFAULT
    },
  }, //DEFAULT 1
  singleJobData: [],
  allAdminJobs: [],
  allAppliedJobs: [],
  searchedQuery: "",
  filterQuery: "",
  filterSalary: [],
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
    setPaginationData: (state, action) => {
      const { scope, data } = action.payload;
      state.paginationData[scope] = { ...state.paginationData[scope], ...data };
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
    setFilterQuery: (state, action) => {
      state.filterQuery = action.payload;
    },
    setFilterSalary: (state, action) => {
      state.filterSalary = action.payload.map(Number);
    },
  },
});

//EXPORTING REDUCERS/ACTION TO USE IN DIFFERENT COMPONENTS
export const {
  setAllJobs,
  setPaginationData,
  setSingleJobData,
  setAllAdminJobs,
  setAllAppliedJobs,
  setSearchQuery,
  setFilterQuery,
  setFilterSalary,
} = jobSlice.actions;

//EXPORTING JOBSLICE'S ALL REDUCERS TO SPECIFY REDUX STORE
export default jobSlice.reducer;
