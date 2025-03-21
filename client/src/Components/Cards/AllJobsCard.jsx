/* eslint-disable react/prop-types */
import { TiBriefcase } from "react-icons/ti";
import { LuClock9 } from "react-icons/lu";
import { getDateDifference } from "../../../util/getDateDifference";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import SaveJobButton from "../SaveJobButton";

export const AllJobsCard = ({ cardData }) => {
  return (
    <motion.li
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "tween" }}
      className="p-4 border rounded-xl shadow-md dark:drop-shadow-md dark:shadow-zinc-600 
      dark:bg-zinc-800 dark:border-zinc-500 w-full sm:w-5/6 md:w-full max-w-[310px] md:max-w-none 
      flex flex-col justify-between h-[300px] lg:h-[300px]" // Ensuring Fixed Height
    >
      <div>
        <div className="flex items-center gap-3 ">
          {/* company logo */}
          <div className="rounded-full size-8 overflow-hidden">
            <img
              src={cardData?.CompanyID?.logo}
              alt="logo"
              width="60"
              height="20"
              className="size-full"
            />
          </div>

          {/* company name */}
          <p className="font-bold text-sm md:text-lg text-blue-950 dark:text-white ">
            {cardData?.CompanyID?.companyName?.length > 13
              ? `${cardData?.CompanyID?.companyName?.slice(0, 12)}...`
              : cardData?.CompanyID?.companyName}
          </p>
        </div>

        {/* TITLE AND JOB TYPE */}
        <h4 className="mt-2 text-sm md:text-md lg:text-md font-semibold text-blue-950 dark:text-white">
          {cardData?.title?.length > 20
            ? `${cardData?.title?.slice(0, 22)}...`
            : cardData?.title}
        </h4>
        <div className="mt-1 flex gap-10  md:gap-4 [&>p]:text-xs">
          <p className="flex gap-px text-gray-500">
            <TiBriefcase className="my-auto text-blue-600" />
            <span>{cardData?.jobType}</span>
          </p>
          <p className="flex gap-px text-gray-500 align-middle">
            <LuClock9 className="my-auto text-blue-600" />
            <span>
              {getDateDifference(cardData?.createdAt) === 0
                ? "Today"
                : `${getDateDifference(cardData?.createdAt)} Day Ago`}
            </span>
          </p>
        </div>

        {/* JOB DESC */}
        <p className="my-1 md:my-3 text-xs md:text-xs lg:text-sm md:h-10 text-slate-500 dark:text-white">
          {cardData?.description.length > 25
            ? `${cardData?.description?.slice(0, 45)}...`
            : cardData?.description}
        </p>

        {/* REQUIREMENTS */}
        <ul className="my-1 md:my-3 text-xs md:text-sm text-slate-500 flex gap-2 flex-wrap ">
          {cardData?.requirements.slice(0, 2)?.map((requirement, index) => {
            return (
              <li
                key={index}
                className="border rounded p-1 bg-neutral-100 dark:bg-zinc-700 dark:text-white dark:border-none"
              >
                {requirement?.length <= 5
                  ? `${requirement} `
                  : `${requirement.slice(0, 5)}...`}
              </li>
            );
          })}

          <li className="border rounded p-1 bg-gray-100 dark:bg-zinc-700 dark:text-white dark:border-none">
            More...
          </li>
        </ul>

        <p className="font-bold text-blue-700 text-xl dark:text-white">
          {cardData?.salary}
          <span className="text-sm text-slate-500 font-semibold dark:text-blue-300">
            LPA
          </span>
        </p>

        <div className="mt-2 md:mt-4 ld:mt-6 grid grid-cols-1 md:grid-cols-2 gap-2">
          <NavLink
            className={` border rounded bg-blue-400 text-white dark:border-none py-1`}
            to={`/description/${cardData?._id}`}
          >
            <span className="flex justify-center w-ful">View</span>
          </NavLink>

          <SaveJobButton jobId={cardData?._id} />
        </div>
      </div>
    </motion.li>
  );
};
