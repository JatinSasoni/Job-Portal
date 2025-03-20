/* eslint-disable react/prop-types */

export const TopRecruitersCard = ({ cardData }) => {
  return (
    <div
      className="p-4 border rounded-xl shadow-md dark:drop-shadow-md dark:shadow-zinc-600 
    dark:bg-zinc-800 dark:border-zinc-500 w-full flex flex-col justify-between "
    >
      <div className="flex gap-3 items-center ">
        {/* company logo */}
        <div className="rounded-full size-10 border overflow-hidden ">
          <img
            src={cardData?.companyLogo}
            alt="logo"
            width="60"
            height="20"
            className="size-full"
          />
        </div>

        {/* company name */}
        <p className="alert dark:text-white">{cardData?.companyName}</p>
      </div>

      <div className="font-bold flex gap-3 w-2/3  mx-auto">
        <span className="text-gray-600 text-xs dark:text-slate-50 w-full">
          {cardData?.companyLocation}
        </span>
        <span className="text-gray-500 text-xs dark:text-white w-full ">
          Since : {cardData?.companySince?.split("-")[0]}
        </span>
      </div>
    </div>
  );
};
