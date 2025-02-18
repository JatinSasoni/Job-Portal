/* eslint-disable react/prop-types */
import { TiBriefcase } from "react-icons/ti";
import { LuClock9 } from "react-icons/lu";
import { getDateDifference } from "../../../util/getDateDifference";
import { NavLink } from "react-router-dom";

export const AllJobsCard = ({ cardData }) => {
  return (
    <li>
      <div className="card ">
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
          <p className="font-bold text-lg text-blue-950">
            {cardData?.CompanyID?.companyName}
          </p>
        </div>

        {/* TITLE AND JOB TYPE */}
        <h4 className="mt-4 font-semibold text-blue-950">{cardData?.title}</h4>
        <div className="flex gap-4 [&>p]:text-xs ">
          <p className="flex gap-px text-gray-400">
            <TiBriefcase className="my-auto" />
            <span>{cardData?.jobType}</span>
          </p>
          <p className="flex gap-px text-gray-400 align-middle">
            <LuClock9 className="my-auto" />{" "}
            <span>
              {" "}
              {getDateDifference(cardData?.createdAt) === 0
                ? "Today"
                : `${getDateDifference(cardData?.createdAt)} Day Ago`}
            </span>
          </p>
        </div>

        {/* JOB DESC */}
        <p className="my-3 text-sm text-slate-500">{cardData?.description}</p>

        {/* REQUIREMENTS */}
        <ul className="my-3 text-sm text-slate-500 flex gap-2 flex-wrap">
          {cardData?.requirements?.map((requirement, index) => {
            return (
              <li key={index} className="border rounded p-1 bg-gray-100">
                {requirement}
              </li>
            );
          })}
        </ul>

        <p className="font-bold text-blue-700 text-xl">
          {cardData?.salary}
          <span className="text-sm text-slate-500 font-light">LPA</span>
        </p>

        <div className="actions grid grid-cols-2 gap-2">
          <NavLink
            className="bg-blue-700 text-white rounded p-2 text-center"
            to={`/description/${cardData?._id}`}
          >
            Apply now
          </NavLink>

          <a className="border bg-slate-50 rounded p-2 text-center" href="">
            Save
          </a>
        </div>
      </div>
    </li>
  );
};
