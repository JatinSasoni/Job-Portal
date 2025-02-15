import { createSlice } from "@reduxjs/toolkit";

//INITIAL STATE FOR JOB SLICE
const initialState = {
  allCompanies: [],
  singleCompanyData: [],
};

//companySlice
const companySlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    //--ACTIONS
    setAllCompanies: (state, action) => {
      state.allCompanies = action.payload;
    },
    setSingleCompanyData: (state, action) => {
      state.singleCompanyData = action.payload;
    },
  },
});

//EXPORTING REDUCERS/ACTION TO USE IN DIFFERENT COMPONENTS
export const { setAllCompanies, setSingleCompanyData } = companySlice.actions;

//EXPORTING JOBSLICE'S ALL REDUCERS TO SPECIFY REDUX STORE
export default companySlice.reducer;
