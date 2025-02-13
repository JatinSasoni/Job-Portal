import { HeroContainer2 } from "../Components/HeroContaier2";
import { HeroContainer } from "../Components/HeroContainer";
import { JobOfTheDay } from "../Components/JobOfTheDay";
import { TopRecruiters } from "../Components/TopRecruiters";
import { TrustedCompanies } from "../Components/TrustedCompanies";

const trustedCompanies = [
  {
    name: "dell",
    imgURL: "/trustedCompaniesLogo/amazon.png",
  },
  {
    name: "dell",
    imgURL: "/trustedCompaniesLogo/dell.png",
  },
  {
    name: "dell",
    imgURL: "/trustedCompaniesLogo/microsoft.png",
  },
  {
    name: "dell",
    imgURL: "/trustedCompaniesLogo/sony.png",
  },
  {
    name: "dell",
    imgURL: "/trustedCompaniesLogo/amazon.png",
  },
  {
    name: "dell",
    imgURL: "/trustedCompaniesLogo/dell.png",
  },
  {
    name: "dell",
    imgURL: "/trustedCompaniesLogo/dell.png",
  },
  {
    name: "dell",
    imgURL: "/trustedCompaniesLogo/dell.png",
  },
];

export const Home = () => {
  return (
    <>
      <HeroContainer />

      {/* TRUSTED-COMPANIES */}
      <TrustedCompanies />

      {/* CARASAUL */}
      {/* <Carasoul /> */}

      {/* JOB OF THE DAY */}
      <JobOfTheDay />

      {/* Hero-2 */}
      <HeroContainer2 />

      {/* TopRecruiters */}
      <TopRecruiters trustedCompanies={trustedCompanies} />
    </>
  );
};
