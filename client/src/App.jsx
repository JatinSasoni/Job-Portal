import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./Router/AppRouter";
import { OfflinePage } from "./Components/OfflinePage";

function App() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Show offline page when offline
  if (isOffline) {
    return <OfflinePage />;
  }

  return <RouterProvider router={AppRouter}></RouterProvider>;
}

export default App;