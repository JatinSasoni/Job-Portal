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
