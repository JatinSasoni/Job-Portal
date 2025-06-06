/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { getDateDifference } from "../../../util/getDateDifference";
import { TiBriefcase } from "react-icons/ti";
import { LuClock9 } from "react-icons/lu";
import { motion } from "motion/react";

const JobOfDayCard = ({ cardData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 1.5 }}
      className="card drop-shadow-xl dark:shadow-md dark:shadow-white dark:bg-blue-950"
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
        <p className="font-bold text-lg text-blue-950 dark:text-white">
          {cardData?.CompanyID?.companyName?.length > 13
            ? `${cardData?.CompanyID?.companyName?.slice(0, 10)}...`
            : cardData?.CompanyID?.companyName}
        </p>
      </div>

      {/* TITLE AND JOB TYPE */}
      <h4 className="mt-4 font-semibold text-blue-950 dark:text-white">
        {cardData?.title?.length > 20
          ? `${cardData?.title?.slice(0, 20)}...`
          : cardData?.title}
      </h4>
      <div className="flex gap-4 [&>p]:text-xs ">
        <p className="flex gap-px text-gray-400">
          <TiBriefcase className="my-auto" />
          <span>{cardData?.jobType}</span>
        </p>
        <p className="flex gap-px text-gray-400 align-middle">
          <LuClock9 className="my-auto" />
          <span>
            {getDateDifference(cardData?.createdAt) === 0
              ? "Today"
              : `${getDateDifference(cardData?.createdAt)} Day Ago`}
          </span>
        </p>
      </div>

      {/* JOB DESC */}
      <p className="my-3 text-sm text-slate-500 dark:text-white">
        {cardData?.description.length > 25
          ? `${cardData?.description?.slice(0, 25)}...`
          : cardData?.description}
      </p>

      {/* REQUIREMENTS */}
      <ul className="my-3 text-sm text-slate-500 flex gap-2 flex-wrap ">
        {cardData?.requirements.slice(0, 1)?.map((requirement, index) => {
          return (
            <li key={index} className="border rounded p-1 bg-gray-100">
              {requirement?.length <= 5
                ? `${requirement}`
                : `${requirement.slice(0, 10)}...`}
            </li>
          );
        })}
        <li className="border rounded p-1 bg-gray-100">More...</li>
      </ul>

      <p className="font-bold text-blue-700 text-xl dark:text-white">
        {cardData?.salary}
        <span className="text-sm font-semibold text-slate-500  dark:text-blue-300 ">
          LPA
        </span>
      </p>

      <div className="actions grid grid-cols-2 gap-2">
        <NavLink
          className="bg-blue-700 text-white rounded p-1 text-center"
          to={`/description/${cardData?._id}`}
        >
          View
        </NavLink>

        <a className="border bg-slate-50 rounded p-1 text-center" href="">
          Save
        </a>
      </div>
    </motion.div>
  );
};

export default JobOfDayCard;
