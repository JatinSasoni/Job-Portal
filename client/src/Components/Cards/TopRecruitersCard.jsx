/* eslint-disable react/prop-types */

export const TopRecruitersCard = ({ cardData }) => {
  return (
    <div className="card drop-shadow-md dark:bg-zinc-800 dark:shadow-sm dark:shadow-white ">
      <div className="header">
        {/* company logo */}
        <div className="rounded-full size-10 border overflow-hidden ">
          <img
            src={cardData?.CompanyID?.logo}
            alt="logo"
            width="60"
            height="20"
            className="size-full"
          />
        </div>

        {/* company name */}
        <p className="alert dark:text-white">
          {cardData?.CompanyID?.companyName}
        </p>
      </div>

      <div className="font-bold flex gap-3 w-2/3 mx-auto">
        <span className="text-gray-600 text-xs dark:text-slate-50">
          {cardData?.location}
        </span>
        <span className="text-gray-500 text-xs dark:text-white">
          Since : {cardData?.CompanyID?.createdAt?.split("-")[0]}
        </span>
      </div>
    </div>
  );
};
