/* eslint-disable react/prop-types */

const companies = [
  {
    logo: "https://assets.algoexpert.io/spas/main/prod/g627585ec77-prod/dist/images/b2bd91d7b87b2181ca45.png",
  },
  {
    logo: "https://assets.algoexpert.io/spas/main/prod/g627585ec77-prod/dist/images/a2b3c3709ffedce2a22a.png",
  },
  {
    logo: "https://assets.algoexpert.io/spas/main/prod/g627585ec77-prod/dist/images/3cd767dea94a85078ca4.png",
  },
  {
    logo: "https://assets.algoexpert.io/spas/main/prod/g627585ec77-prod/dist/images/3b7d9f4b073deb6a9b74.png",
  },
  {
    logo: "https://assets.algoexpert.io/spas/main/prod/g627585ec77-prod/dist/images/6591cdc0702b32310306.png",
  },
  {
    logo: "https://assets.algoexpert.io/spas/main/prod/g627585ec77-prod/dist/images/7ae42bac3b34999c0db3.png",
  },
];
const copy = [
  {
    logo: "https://assets.algoexpert.io/spas/main/prod/g627585ec77-prod/dist/images/b2bd91d7b87b2181ca45.png",
  },
  {
    logo: "https://assets.algoexpert.io/spas/main/prod/g627585ec77-prod/dist/images/a2b3c3709ffedce2a22a.png",
  },
  {
    logo: "https://assets.algoexpert.io/spas/main/prod/g627585ec77-prod/dist/images/3cd767dea94a85078ca4.png",
  },
  {
    logo: "https://assets.algoexpert.io/spas/main/prod/g627585ec77-prod/dist/images/3b7d9f4b073deb6a9b74.png",
  },
  {
    logo: "https://assets.algoexpert.io/spas/main/prod/g627585ec77-prod/dist/images/6591cdc0702b32310306.png",
  },
  {
    logo: "https://assets.algoexpert.io/spas/main/prod/g627585ec77-prod/dist/images/7ae42bac3b34999c0db3.png",
  },
];

const companies2 = [
  {
    logo: "https://assets.algoexpert.io/spas/main/prod/g627585ec77-prod/dist/images/6c585c33ca6c71c79bb7.png",
  },
  {
    logo: "https://assets.algoexpert.io/spas/main/prod/g627585ec77-prod/dist/images/f50ae7cbf6cc805bdadc.png",
  },
  {
    logo: "https://assets.algoexpert.io/spas/main/prod/g627585ec77-prod/dist/images/35e044b3354aaa0caed5.png",
  },
  {
    logo: "https://assets.algoexpert.io/spas/main/prod/g627585ec77-prod/dist/images/0384060dcbf73b6a707c.png",
  },
  {
    logo: "https://assets.algoexpert.io/spas/main/prod/g627585ec77-prod/dist/images/9dd55e54b5a28658bf4e.png",
  },
  {
    logo: "https://assets.algoexpert.io/spas/main/prod/g627585ec77-prod/dist/images/52d8f54e445899c1e716.png",
  },
];
const copy2 = [
  {
    logo: "https://assets.algoexpert.io/spas/main/prod/g627585ec77-prod/dist/images/6c585c33ca6c71c79bb7.png",
  },
  {
    logo: "https://assets.algoexpert.io/spas/main/prod/g627585ec77-prod/dist/images/f50ae7cbf6cc805bdadc.png",
  },
  {
    logo: "https://assets.algoexpert.io/spas/main/prod/g627585ec77-prod/dist/images/35e044b3354aaa0caed5.png",
  },
  {
    logo: "https://assets.algoexpert.io/spas/main/prod/g627585ec77-prod/dist/images/0384060dcbf73b6a707c.png",
  },
  {
    logo: "https://assets.algoexpert.io/spas/main/prod/g627585ec77-prod/dist/images/9dd55e54b5a28658bf4e.png",
  },
  {
    logo: "https://assets.algoexpert.io/spas/main/prod/g627585ec77-prod/dist/images/52d8f54e445899c1e716.png",
  },
];

const MarqueeContainer = ({ imagesArray, animationType }) => {
  return (
    <div
      className={`flex flex-shrink-0 gap-3 md:gap-0 w-full justify-around ${animationType} `}
    >
      {imagesArray?.map((curr, index) => (
        <div
          key={index}
          className=" grid place-items-center w-16 md:w-24 lg:w-32 xl:w-40   "
        >
          <img src={curr.logo} alt="Company" />
        </div>
      ))}
    </div>
  );
};

export const TrustedCompanies = () => {
  return (
    <>
      {/* SECTION */}
      <div className="my-2 dark:bg-zinc-200 p-1 md:p-3  ">
        {/* MARQUEE DIV (CONTAINING 2 DIVS)*/}
        <div className="flex gap-3 sm:gap-0 overflow-hidden select-none mask-gradient">
          {/* MARQUEE CONTAINER 1*/}
          <MarqueeContainer
            imagesArray={companies}
            animationType="animate-infiniteXScr"
          />
          {/* MARQUEE CONTAINER 2*/}
          <MarqueeContainer
            imagesArray={copy}
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
