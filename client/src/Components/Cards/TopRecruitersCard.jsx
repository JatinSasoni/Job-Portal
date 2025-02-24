/* eslint-disable react/prop-types */

import { motion } from "motion/react";
export const TopRecruitersCard = ({ cardData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" }}
      className="card drop-shadow-md"
    >
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
        {/* <span className="text-gray-500 text-xs">
          Since : {cardData?.CompanyID?.createdAt?.split("-")[0]}
        </span> */}
      </div>

      <div className="font-bold flex gap-3 w-2/3 mx-auto">
        <span className="text-gray-600 text-xs">{cardData?.location}</span>
        <span className="text-gray-500 text-xs">
          Since : {cardData?.CompanyID?.createdAt?.split("-")[0]}
        </span>
      </div>
    </motion.div>
  );
};
