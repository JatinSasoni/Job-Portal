import { TiBriefcase } from "react-icons/ti";
import { LuClock9 } from "react-icons/lu";
import { CiSaveDown2 } from "react-icons/ci";

export const AllJobsCard = () => {
  return (
    <li>
      <div className="card ">
        <div className="header">
          {/* company logo */}
          <span className="icon size-10">
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            ></svg>
          </span>

          {/* company name */}
          <p className="font-bold text-lg text-blue-950">Google</p>
        </div>

        {/* TITLE AND JOB TYPE */}
        <h4 className="mt-4 font-semibold text-blue-950">
          Need a soft engineer{" "}
        </h4>
        <div className="flex gap-4 [&>p]:text-xs ">
          <p className="flex gap-px text-gray-400">
            <TiBriefcase className="my-auto" />
            <span>Full Time</span>
          </p>
          <p className="flex gap-px text-gray-400 align-middle">
            <LuClock9 className="my-auto" /> <span> 4 Min Ago</span>
          </p>
        </div>

        {/* JOB DESC */}
        <p className="my-3 text-sm text-slate-500">
          Need a frontend dev and backend dev with AI knowelede
        </p>

        {/* REQUIREMENTS */}
        <ul className="my-3 text-sm text-slate-500 flex gap-2 flex-wrap">
          <li className="border rounded p-1 bg-gray-100">Adobe</li>
          <li className="border rounded p-1 bg-gray-100">ReactJS</li>
          <li className="border rounded p-1 bg-gray-100">Node JS</li>
        </ul>

        <p className="font-bold text-blue-700 text-xl">
          $5000<span className="text-sm text-slate-500 font-light">/Hour</span>
        </p>

        <div className="actions grid grid-cols-2 gap-2">
          <a className="bg-blue-700 text-white rounded p-2 text-center" href="">
            Apply now
          </a>

          <a className="border bg-slate-50 rounded p-2 text-center" href="">
            Save
          </a>
        </div>
      </div>
    </li>
  );
};
