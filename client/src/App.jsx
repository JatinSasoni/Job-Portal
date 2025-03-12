import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
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
import { AdminApplicants } from "./Components/admin/AdminApplicants";
import ProtectAdminRoute from "./Components/admin/ProtectAdminRoute";
import { BrowsePage } from "./Components/BrowsePage";
import { ResetPassPage } from "./pages/ResetPassPage";
import { VerifyOTPPage } from "./pages/VerifyOTPPage";
import { ChangePasswordPage } from "./pages/ChangePasswordPage";
import { ProtectedChangePassword } from "./pages/protect/ProtectChangePassword";
import { Contact } from "./pages/Contact";
import RegisterPage from "./pages/RegisterPage";
import { SavedJobs } from "./Components/SavedJobs";
import { ViewApplicant } from "./Components/admin/ViewApplicant";
import { UpdateJobPost } from "./Components/admin/UpdateJobPost";

//React Router Dom
const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/user/jobs/saved",
        element: <SavedJobs />,
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
    errorElement: <ErrorPage />,
    path: "/description/:jobID",
    element: <JobProfile />,
  },
  {
    errorElement: <ErrorPage />,
    path: "/login",
    element: <Login />,
  },
  {
    errorElement: <ErrorPage />,
    path: "/signup",
    element: <RegisterPage />,
  },

  //ADMIN/RECRUITER ROUTES
  {
    path: "/admin/companies",
    errorElement: <ErrorPage />,
    element: (
      <ProtectAdminRoute>
        <AdminCompanies />
      </ProtectAdminRoute>
    ),
  },
  {
    path: "/admin/register",
    errorElement: <ErrorPage />,
    element: (
      <ProtectAdminRoute>
        <RegisterNewCompany />
      </ProtectAdminRoute>
    ),
  },
  {
    path: "/admin/company/update/:companyID",
    errorElement: <ErrorPage />,

    element: (
      <ProtectAdminRoute>
        <UpdateCompany />
      </ProtectAdminRoute>
    ),
  },
  {
    path: "/admin/jobs",
    errorElement: <ErrorPage />,

    element: (
      <ProtectAdminRoute>
        <AdminJobs />
      </ProtectAdminRoute>
    ),
  },
  {
    path: "/admin/job/create",
    errorElement: <ErrorPage />,

    element: (
      <ProtectAdminRoute>
        <RegisterNewJob />
      </ProtectAdminRoute>
    ),
  },
  {
    path: "/admin/job/:jobID/applicants",
    errorElement: <ErrorPage />,

    element: (
      <ProtectAdminRoute>
        <AdminApplicants />
      </ProtectAdminRoute>
    ),
  },
  {
    path: "/admin/applicant/:applicantID/profile",
    errorElement: <ErrorPage />,

    element: (
      <ProtectAdminRoute>
        <ViewApplicant />
      </ProtectAdminRoute>
    ),
  },
  {
    path: "/admin/job-post/:jobID/edit",
    errorElement: <ErrorPage />,

    element: (
      <ProtectAdminRoute>
        <UpdateJobPost />
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
