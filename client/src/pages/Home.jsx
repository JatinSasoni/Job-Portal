import { useNavigate } from "react-router-dom";
import React, { useEffect, Suspense } from "react";
import { useSelector } from "react-redux";
import { HomeSkeleton } from "../Components/Skeleton/HomeSkeleton";

// Lazy load all components
const HeroContainer = React.lazy(() =>
  import("../Components/HeroContainer").then((module) => ({
    default: module.HeroContainer,
  }))
);

const HeroContainer2 = React.lazy(() =>
  import("../Components/HeroContaier2").then((module) => ({
    default: module.HeroContainer2,
  }))
);

const JobOfTheDay = React.lazy(() =>
  import("../Components/JobOfTheDay").then((module) => ({
    default: module.JobOfTheDay,
  }))
);

const TopRecruiters = React.lazy(() =>
  import("../Components/TopRecruiters").then((module) => ({
    default: module.TopRecruiters,
  }))
);

const UserReviews = React.lazy(() =>
  import("../Components/UserReviews").then((module) => ({
    default: module.UserReviews,
  }))
);

const MostAskedQues = React.lazy(() =>
  import("../Components/MostAskedQues").then((module) => ({
    default: module.MostAskedQues,
  }))
);

const TrustedCompanies = React.lazy(() =>
  import("../Components/TrustedCompanies")
);

export const Home = () => {
  const { loggedInUser } = useSelector((store) => store.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [loggedInUser, navigate]);

  return (
    <Suspense fallback={<HomeSkeleton />}>
      <HeroContainer />

      {/* TRUSTED-COMPANIES */}
      <Suspense fallback={<div className="h-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-4"></div>}>
        <TrustedCompanies />
      </Suspense>

      {/* JOB OF THE DAY */}
      <Suspense fallback={<div className="h-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-4"></div>}>
        <JobOfTheDay />
      </Suspense>

      {/* Hero-2 */}
      <Suspense fallback={<div className="h-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-4"></div>}>
        <HeroContainer2 />
      </Suspense>

      {/* TopRecruiters */}
      <Suspense fallback={<div className="h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-4"></div>}>
        <TopRecruiters />
      </Suspense>

      {/* MostAskedQues */}
      <Suspense fallback={<div className="h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-4"></div>}>
        <MostAskedQues />
      </Suspense>

      {/* Customer Reviews */}
      <Suspense fallback={<div className="h-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-4"></div>}>
        <UserReviews />
      </Suspense>
    </Suspense>
  );
};
