import { useMemo } from "react";

export const TrustedCompanies = () => {
  const trustedCompanies = useMemo(
    () => [
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
    ],
    []
  );

  return (
    <div className="flex bg-white justify-around drop-shadow-xl ">
      {trustedCompanies?.map((logo, ind) => {
        return (
          <div key={ind} className="contrast-125 m-auto ">
            <img src={logo.imgURL} alt="trusted" className=" w-32"></img>
          </div>
        );
      })}
    </div>
  );
};
