import axios from "axios";

//AXIOS INSTANCEs
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URI}`,
});

//LOGIN POST API
export const handleLoginAPICall = (data) => {
  return api.post("/api/v1/user/login", data, {
    withCredentials: true,
    headers: {
      "Content-Type": "Application/json",
    },
  });
};

//SIGNUP POST API
export const handleSignupAPICall = (data) => {
  return api.post("/api/v1/user/register", data, {
    withCredentials: true,
    headers: {
      "Content-Type": "Application/json",
    },
  });
};

//UPDATE PROFILE API
export const handleUpdateAPICall = (data) => {
  return api.post("/api/v1/user/profile/update", data, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

//ADMIN API
export const handleRegisterComAPI = (data) => {
  return api.post("/api/v1/company/register", data, {
    withCredentials: true,
    headers: {
      "Content-Type": "Application/json",
    },
  });
};

//UPDATE COMPANY
export const handleUpdateComAPI = (data, companyID) => {
  return api.put(`/api/v1/company/update/${companyID}`, data, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const handlePostJobAPI = (data) => {
  return api.post("/api/v1/job/post", data, {
    withCredentials: true,
    headers: {
      "Content-Type": "Application/json",
    },
  });
};
