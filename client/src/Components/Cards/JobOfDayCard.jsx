/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { getDateDifference } from "../../../util/getDateDifference";
const JobOfDayCard = ({ cardData }) => {
  return (
    <div className="card">
      <div className="header">
        {/* company logo */}
        <span className="icon">
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          ></svg>
        </span>

        {/* company name */}
        <p className="alert">{cardData?.CompanyID?.companyName}</p>
      </div>

      {/* TITLE AND JOB TYPE */}
      <h4 className="mt-2 font-semibold">{cardData?.title}</h4>
      <div className="flex gap-4 [&>p]:text-xs ">
        <p>{cardData?.jobType}</p>
        <p>{getDateDifference(cardData?.createdAt)} Days Ago</p>
      </div>

      {/* JOB DESC */}
      <p className="message">{cardData?.description}</p>

      <p className="font-bold">
        <span className="text-blue-500 text-md">{cardData?.salary}</span>LPA
      </p>

      <div className="actions">
        <NavLink className="read" to={`/description/${cardData._id}`}>
          Take a Look
        </NavLink>

        <NavLink className="mark-as-read" href="">
          Save for later
        </NavLink>
      </div>
    </div>
  );
};

export default JobOfDayCard;
