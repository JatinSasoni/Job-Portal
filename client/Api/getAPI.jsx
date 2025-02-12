import axios from "axios";

//AXIOS INSTANCE
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URI}`,
});

//LOGOUT POST API
export const handleLoginAPICall = () => {
  return api.get("/api/v1/user/logout");
};
