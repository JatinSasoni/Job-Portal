import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../Components/Shared/Navbar";
import { Footer } from "../Components/Shared/Footer";
import { useEffect, useState } from "react";
import { LoadingPage } from "../Components/LoadingPage";

export const AppLayout = () => {
  // Check sessionStorage before rendering
  const shouldShowPreloader = !sessionStorage.getItem("hasVisited");
  const [localLoading, setLocalLoading] = useState(shouldShowPreloader);
  const location = useLocation(); // Get current route location

  useEffect(() => {
    if (shouldShowPreloader) {
      sessionStorage.setItem("hasVisited", "true");

      setTimeout(() => {
        setLocalLoading(false);
      }, 1500); // Adjust time as needed
    }
  }, [shouldShowPreloader]);

  //FOOTER NAV
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [location.pathname]); // Trigger scroll on every navigation change

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
