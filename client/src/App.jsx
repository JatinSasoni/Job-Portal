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
import { AdminJobs } from "./Components/admin/AdminJobs";
import { RegisterNewJob } from "./Components/admin/RegisterNewJob";
import { AdminApplicantsTable } from "./Components/admin/AdminApplicantsTable";
import ProtectAdminRoute from "./Components/admin/ProtectAdminRoute";
import { BrowsePage } from "./Components/BrowsePage";
import { ResetPassPage } from "./pages/ResetPassPage";
import { VerifyOTPPage } from "./pages/VerifyOTPPage";
import { ChangePasswordPage } from "./pages/ChangePasswordPage";
import { ProtectedChangePassword } from "./pages/protect/ProtectChangePassword";
import { About } from "./pages/About";

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
        path: "/about",
        element: <About />,
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
      {
        path: "/browse",
        element: <BrowsePage />,
      },
      {
        path: "/user/reset-pass",
        element: <ResetPassPage />,
      },
      {
        path: "/user/:userID/verify-otp",
        element: <VerifyOTPPage />,
      },
      {
        path: "/user/change/:userID/password",
        element: (
          <ProtectedChangePassword>
            <ChangePasswordPage />
          </ProtectedChangePassword>
        ),
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
    element: (
      <ProtectAdminRoute>
        <AdminCompanies />
      </ProtectAdminRoute>
    ),
  },
  {
    path: "/admin/register",
    element: (
      <ProtectAdminRoute>
        <RegisterNewCompany />
      </ProtectAdminRoute>
    ),
  },
  {
    path: "/admin/company/update/:companyID",
    element: (
      <ProtectAdminRoute>
        <UpdateCompany />
      </ProtectAdminRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectAdminRoute>
        <AdminJobs />
      </ProtectAdminRoute>
    ),
  },
  {
    path: "/admin/job/create",
    element: (
      <ProtectAdminRoute>
        <RegisterNewJob />
      </ProtectAdminRoute>
    ),
  },
  {
    path: "/admin/job/:jobID/applicants",
    element: (
      <ProtectAdminRoute>
        <AdminApplicantsTable />
      </ProtectAdminRoute>
    ),
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
