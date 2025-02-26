// /remove/:companyID/delete

import axios from "axios";

//AXIOS INSTANCE
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URI}`,
});

//DELETE COMPANY API
export const deleteCompanyAPI = (companyID) => {
  return api.delete(`/api/v1/company/remove/${companyID}/delete`, {
    withCredentials: true,
  });
};
