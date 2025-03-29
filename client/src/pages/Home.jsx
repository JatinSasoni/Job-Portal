import { HeroContainer2 } from "../Components/HeroContaier2";
import { HeroContainer } from "../Components/HeroContainer";
import { JobOfTheDay } from "../Components/JobOfTheDay";
import { TopRecruiters } from "../Components/TopRecruiters";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { UserReviews } from "../Components/UserReviews";
import { MostAskedQues } from "../Components/MostAskedQues";
import TrustedCompanies from "../Components/TrustedCompanies";

export const Home = () => {
  const { loggedInUser } = useSelector((store) => store.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [loggedInUser, navigate]);

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
      <TopRecruiters />

      {/* MostAskedQues */}
      <MostAskedQues />

      {/* Customer Reviews */}
      <UserReviews />
    </>
  );
};
