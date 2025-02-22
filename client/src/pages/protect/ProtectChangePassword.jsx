/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

export const ProtectedChangePassword = ({ children }) => {
  const otpVerified = sessionStorage.getItem("otpVerified");
  return otpVerified ? children : <Navigate to="/user/reset-pass" />;
};
