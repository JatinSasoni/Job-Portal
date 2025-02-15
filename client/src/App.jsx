import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AppLayout } from "./Layout/AppLayout";
import { Jobs } from "./pages/Jobs";
import { Profile } from "./Components/Profile";
import { JobProfile } from "./Components/JobProfile";
import { AdminCompanies } from "./Components/admin/AdminCompanies";
import { RegisterNewCompany } from "./Components/admin/RegisterNewCompany";
import { UpdateCompany } from "./Components/admin/UpdateCompany";
import { ErrorPage } from "./Components/ErrorPage";

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

  //ADMIN/RECRUITER ROUTES
  {
    path: "/admin/companies",
    element: <AdminCompanies />,
  },
  {
    path: "/admin/register",
    element: <RegisterNewCompany />,
  },
  {
    path: "/admin/company/update/:companyID",
    element: <UpdateCompany />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={AppRouter}></RouterProvider>;
}

export default App;
