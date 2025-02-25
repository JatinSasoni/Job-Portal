import JobOfDayCard from "./Cards/JobOfDayCard";
import { useEffect, useMemo, useState } from "react";
import { handleGetAllJobs } from "../../Api/getAPI";
import { JobNotFound } from "./JobNotFound";

export const JobOfTheDay = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllJobs = async () => {
      setLoading(true);
      try {
        const response = await handleGetAllJobs();
        if (response.data.SUCCESS) {
          setAllJobs(response.data.allJobs);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllJobs();
  }, []);

  const jobCards = useMemo(() => {
    return allJobs
      .slice(0, 4)
      .map((card) =>
        card._id ? <JobOfDayCard key={card._id} cardData={card} /> : null
      );
  }, [allJobs]);

  if (loading) {
    return <div className="loading"></div>;
  }

  return (
    <div className="pt-14 container max-w-screen-xl mx-auto flex flex-col gap-6">
      <h2 className="text-5xl text-blue-950 text-center font-semibold dark:text-white">
        Jobs Of The Day
      </h2>
      <p className="text-center text-slate-600 font-semibold dark:text-slate-400">
        Explore the different types of available jobs to apply and discover
        which is right for you.
      </p>
      {!allJobs.length ? (
        <div className="h-96 w-full">
          <JobNotFound />
        </div>
      ) : (
        <div className="grid grid-cols-4 p-10 px-20 place-items-center gap-14">
          {jobCards}
        </div>
      )}
    </div>
  );
};
