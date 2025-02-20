/* eslint-disable react/prop-types */
export const TopRecruitersCard = ({ cardData }) => {
  return (
    <div className="card">
      <div className="header">
        {/* company logo */}
        <div className="rounded-full size-10 border overflow-hidden">
          <img
            src={cardData?.CompanyID?.logo}
            alt="logo"
            width="60"
            height="20"
            className="size-full"
          />
        </div>

        {/* company name */}
        <p className="alert">{cardData?.CompanyID?.companyName}</p>
      </div>

      <p className="font-bold flex gap-3">
        <span className="text-gray-600 text-xs">{cardData?.location}</span>
        <span className="text-gray-500 text-xs">
          Since : {cardData?.CompanyID?.createdAt?.split("-")[0]}
        </span>
      </p>
    </div>
  );
};
