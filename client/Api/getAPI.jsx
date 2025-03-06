import axios from "axios";

//AXIOS INSTANCE
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URI}`,
});

//LOGOUT GET API
export const handleLogoutAPICall = () => {
  return api.get("/api/v1/user/logout", {
    withCredentials: true,
  });
};

//GET ALL JOBS API
export const handleGetAllJobs = (keyword = "") => {
  return api.get(`/api/v1/job/get?keyword=${keyword}`, {
    withCredentials: true,
  });
};

//GET SINGLE JOB BY JOB ID
export const handleGetSingleJob = (JobID) => {
  return api.get(`/api/v1/job/get/${JobID}`, {
    withCredentials: true,
  });
};

//APPLY FOR JOB POST API
export const handleApplyForJob = (JobID) => {
  return api.get(`/api/v1/application/apply/${JobID}`, {
    withCredentials: true,
  });
};

export const handleGetAllAppliedJobs = () => {
  return api.get(`/api/v1/application/get`, {
    withCredentials: true,
  });
};

//ADMIN
export const handleGetSingleCompanyDes = (companyID) => {
  return api.get(`/api/v1/company/get/${companyID}`, {
    withCredentials: true,
  });
};

export const handleGetAllCompanyDes = () => {
  return api.get(`/api/v1/company/get`, {
    withCredentials: true,
  });
};

export const handleGetAllAdminJobs = () => {
  return api.get(`/api/v1/job/getadminjobs`, {
    withCredentials: true,
  });
};

export const handleGetAllApplicantsAPI = (jobID) => {
  return api.get(`api/v1/application/${jobID}/applicants`, {
    withCredentials: true,
  });
};

export const handleGetAllContactsAPI = () => {
  return api.get(`api/v1/contact/get/contacts`, {
    withCredentials: true,
  });
};
