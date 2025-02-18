/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectAdminRoute = ({ children }) => {
  const { loggedInUser } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedInUser === null || loggedInUser?.role !== "recruiter") {
      navigate("/");
    }
  }, []);
  return <>{children}</>;
};

export default ProtectAdminRoute;
