import JobOfDayCard from "./Cards/JobOfDayCard";
import useGetAllJobs from "../Hooks/getAllJobs";
import { useSelector } from "react-redux";

/* eslint-disable react/prop-types */
export const JobOfTheDay = () => {
  useGetAllJobs();

  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className=" pt-14 container max-w-screen-xl mx-auto flex flex-col gap-6">
      {/* TITLE */}
      <h2 className="text-5xl text-blue-950 text-center font-semibold">
        Jobs Of The Day
      </h2>

      <p className="text-center text-slate-600 font-semibold">
        Explore the different types of available jobs to apply discover which is
        right for you.
      </p>

      {/* JOB GRIDS */}
      <div className="grid grid-cols-3  p-6 gap-y-14 place-items-center">
        {allJobs?.length <= 0 ? (
          <div>No Jobs Found :(</div>
        ) : (
          allJobs?.slice(0, 6).map((card, index) => {
            return <JobOfDayCard key={index} cardData={card} />;
          })
        )}
      </div>
    </div>
  );
};
