import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AppLayout } from "./Layout/AppLayout";
import { Jobs } from "./pages/Jobs";
import { Profile } from "./Components/Profile";
import { JobProfile } from "./Components/JobProfile";

//React Router Dom
const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },

      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/description/:jobID",
    element: <JobProfile />,
  },
]);

function App() {
  return <RouterProvider router={AppRouter}></RouterProvider>;
}

export default App;
