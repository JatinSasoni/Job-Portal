import { Carasoul } from "../Components/Carasoul";
import { HeroContainer2 } from "../Components/HeroContaier2";
import { HeroContainer } from "../Components/HeroContainer";
import { JobOfTheDay } from "../Components/JobOfTheDay";
import { TopRecruiters } from "../Components/TopRecruiters";

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
      <div className="flex bg-white justify-around drop-shadow-xl ">
        {trustedCompanies.map((logo, ind) => {
          return (
            <div key={ind} className="contrast-125 m-auto ">
              <img src={logo.imgURL} alt="trusted" className=" w-32"></img>
            </div>
          );
        })}
      </div>

      {/* CARASAUL */}
      <Carasoul />

      {/* JOB OF THE DAY */}
      <JobOfTheDay trustedCompanies={trustedCompanies} />

      {/* Hero-2 */}
      <HeroContainer2 />

      {/* TopRecruiters */}
      <TopRecruiters trustedCompanies={trustedCompanies} />
    </>
  );
};
