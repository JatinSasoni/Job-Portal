import { Outlet } from "react-router-dom";
import { Navbar } from "../Components/Shared/Navbar";
import { Footer } from "../Components/Shared/Footer";
import { useEffect, useState } from "react";
import { LoadingPage } from "../Components/LoadingPage";

export const AppLayout = () => {
  // Check sessionStorage before rendering
  const shouldShowPreloader = !sessionStorage.getItem("hasVisited");
  const [localLoading, setLocalLoading] = useState(shouldShowPreloader);

  useEffect(() => {
    if (shouldShowPreloader) {
      sessionStorage.setItem("hasVisited", "true");

      setTimeout(() => {
        setLocalLoading(false);
      }, 1500); // Adjust time as needed
    }
  }, [shouldShowPreloader]);

  if (localLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
