import { Outlet } from "react-router-dom";
import { Navbar } from "../Components/Shared/Navbar";

export const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
