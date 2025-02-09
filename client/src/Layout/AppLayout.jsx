import { Outlet } from "react-router-dom";
import { Navbar } from "../Components/Shared/Navbar";
import { Footer } from "../Components/Shared/Footer";

export const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
