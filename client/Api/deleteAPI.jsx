// /remove/:companyID/delete

import axios from "axios";

//AXIOS INSTANCE
const api = axios.create({
  baseURL: window._env_.VITE_API_URI,
});

//DELETE COMPANY API
export const deleteCompanyAPI = (companyID) => {
  return api.delete(`/api/v1/company/remove/${companyID}/delete`, {
    withCredentials: true,
  });
};

//DELETE JOB API
export const deleteJobAPI = (jobID) => {
  return api.delete(`/api/v1/job/remove/${jobID}/delete`, {
    withCredentials: true,
  });
};
