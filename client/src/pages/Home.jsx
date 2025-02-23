import { HeroContainer2 } from "../Components/HeroContaier2";
import { HeroContainer } from "../Components/HeroContainer";
import { JobOfTheDay } from "../Components/JobOfTheDay";
import { TopRecruiters } from "../Components/TopRecruiters";
import { TrustedCompanies } from "../Components/TrustedCompanies";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const Home = () => {
  const { loggedInUser } = useSelector((store) => store.auth);
  const { allJobs } = useSelector((store) => store.job);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <>
      <HeroContainer />

      {/* TRUSTED-COMPANIES */}
      <TrustedCompanies />

      {/* JOB OF THE DAY */}
      <JobOfTheDay />

      {/* Hero-2 */}
      <HeroContainer2 />

      {/* TopRecruiters */}
      <TopRecruiters topRecruiterData={allJobs} />
    </>
  );
};
