import { useEffect, useState } from "react";
import { handleGetAllJobs } from "../../Api/getAPI";
import { JobNotFound } from "./JobNotFound";
import { AllJobsCard } from "./Cards/AllJobsCard";
import { motion } from "motion/react";

export const JobOfTheDay = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        setLoading(true);
        const response = await handleGetAllJobs();
        if (response.data.SUCCESS) {
          JSON.stringify(response.data.allJobs) !== JSON.stringify(allJobs) && //IF DATA DON'T CHANGED PREVENT RE-RENDER
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

  const JobCards = () => {
    return allJobs
      .slice(0, 4)
      .map((card) =>
        card._id ? <AllJobsCard key={card._id} cardData={card} /> : null
      );
  };

  if (loading) {
    return <div className="loading"></div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="mt-14 container max-w-screen-xl mx-auto flex flex-col gap-3"
    >
      <h2 className="text-5xl text-center font-semibold text-gray-700 dark:text-white">
        Jobs Of The Day
      </h2>
      <p className="text-center text-slate-600 font-semibold dark:text-gray-500">
        Explore the different types of available jobs to apply and discover
        which is right for you.
      </p>
      <div>
        {!allJobs.length ? (
          <div className="h-96 w-full">
            <JobNotFound />
          </div>
        ) : (
          <ul className="grid grid-cols-4 gap-8 place-items-center px-32 py-6 ">
            <JobCards />
          </ul>
        )}
      </div>
    </motion.div>
  );
};
