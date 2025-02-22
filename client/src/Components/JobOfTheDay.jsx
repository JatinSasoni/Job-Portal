import JobOfDayCard from "./Cards/JobOfDayCard";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { handleGetAllJobs } from "../../Api/getAPI";
import { setAllJobs } from "../../store/jobSlice";
import { useEffect, useMemo } from "react";

/* eslint-disable react/prop-types */
export const JobOfTheDay = () => {
  const dispatch = useDispatch();

  // Get jobs from Redux store and prevent unnecessary re-renders
  const allJobs = useSelector((store) => store.job.allJobs, shallowEqual);

  // Fetch jobs only if not already in the store
  useEffect(() => {
    if (!allJobs || allJobs.length === 0) {
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
    }
  }, [allJobs, dispatch]);

  // Memoize the job cards to prevent unnecessary re-renders
  const jobCards = useMemo(() => {
    return allJobs
      ?.slice(0, 6)
      .map((card, index) => (
        <JobOfDayCard key={card._id || index} cardData={card} />
      ));
  }, [allJobs]);

  return (
    <div className="pt-14 container max-w-screen-xl mx-auto flex flex-col gap-6">
      {/* TITLE */}
      <h2 className="text-5xl text-blue-950 text-center font-semibold">
        Jobs Of The Day
      </h2>

      <p className="text-center text-slate-600 font-semibold">
        Explore the different types of available jobs to apply and discover
        which is right for you.
      </p>

      {/* JOB GRIDS */}
      <div className="grid grid-cols-3 p-10 px-20 place-items-center gap-14">
        {allJobs?.length === 0 ? (
          <p className="text-2xl font-semibold">No Jobs Found :(</p>
        ) : (
          jobCards
        )}
      </div>
    </div>
  );
};
