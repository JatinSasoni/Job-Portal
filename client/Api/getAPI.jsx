import axios from "axios";

//AXIOS INSTANCE
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URI}`,
});

//LOGOUT GET API
export const handleLoginAPICall = () => {
  return api.get("/api/v1/user/logout", {
    withCredentials: true,
  });
};

//GET ALL JOBS API
export const handleGetAllJobs = () => {
  return api.get("/api/v1/job/get", {
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
