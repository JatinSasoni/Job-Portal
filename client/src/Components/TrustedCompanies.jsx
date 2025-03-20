/* eslint-disable react/prop-types */
import {
  companies1,
  companies2,
  copy1,
  copy2,
} from "../../util/InfiniteScrollX";

const MarqueeContainer = ({ imagesArray, animationType }) => {
  return (
    <div
      className={`flex flex-shrink-0 gap-3 md:gap-0 lg:gap-0 w-full justify-around ${animationType} `}
    >
      {imagesArray?.map((curr, index) => (
        <div
          key={index}
          className=" grid place-items-center w-20 md:w-24 lg:w-32 xl:w-40 "
        >
          <img src={curr.logo} alt="Company" className="object-contain" />
        </div>
      ))}
    </div>
  );
};

export const TrustedCompanies = () => {
  return (
    <>
      {/* SECTION */}
      <div className="my-2 p-2 md:p-3 dark:bg-gray-300  ">
        {/* MARQUEE DIV (CONTAINING 2 DIVS)*/}
        <div className="flex gap-3 sm:gap-0 overflow-hidden select-none mask-gradient">
          {/* MARQUEE CONTAINER 1*/}
          <MarqueeContainer
            imagesArray={companies1}
            animationType="animate-infiniteXScr"
          />
          {/* MARQUEE CONTAINER 2*/}
          <MarqueeContainer
            imagesArray={copy1}
            animationType="animate-infiniteXScr"
          />
        </div>

        {/* MARQUEE DIV (CONTAINING 2 DIVS)*/}
        <div className="flex gap-3 sm:gap-0 overflow-hidden select-none mask-gradient">
          {/* MARQUEE CONTAINER 1*/}
          <MarqueeContainer
            imagesArray={companies2}
            animationType="animate-infiniteXScrAlter"
          />
          {/* MARQUEE CONTAINER 2*/}
          <MarqueeContainer
            imagesArray={copy2}
            animationType="animate-infiniteXScrAlter"
          />
        </div>
      </div>
    </>
  );
};

export default TrustedCompanies;
