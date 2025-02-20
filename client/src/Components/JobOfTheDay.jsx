import JobOfDayCard from "./Cards/JobOfDayCard";
import { useDispatch, useSelector } from "react-redux";
import { handleGetAllJobs } from "../../Api/getAPI";
import { setAllJobs } from "../../store/jobSlice";
import { useEffect } from "react";

/* eslint-disable react/prop-types */
export const JobOfTheDay = () => {
  const dispatch = useDispatch();

  //EXECUTES WHEN COMPONENT MOUNTS FOR THE FIRST TIME ONLY
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await handleGetAllJobs();

        if (response.data.SUCCESS) {
          dispatch(setAllJobs(response.data.allJobs));
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchAllJobs();
  }, []);

  //ALL JOBS FROM STORE
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
      <div className="grid grid-cols-3  p-10 px-20  place-items-center gap-14">
        {allJobs?.length <= 0 ? (
          <p className="text-2xl font-semibold  ">No Jobs Found :(</p>
        ) : (
          allJobs?.slice(0, 6).map((card, index) => {
            return <JobOfDayCard key={index} cardData={card} />;
          })
        )}
      </div>
    </div>
  );
};
