import { useEffect, useState } from "react";
import { handleGetFeaturedJobs } from "../../Api/getAPI";
import { JobNotFound } from "./JobNotFound";
import { AllJobsCard } from "./Cards/AllJobsCard";
import { motion } from "framer-motion";

export const JobOfTheDay = () => {
  const [allJobs, setAllJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await handleGetFeaturedJobs();
        if (response.data.SUCCESS) {
          setAllJobs((prevJobs) =>
            JSON.stringify(prevJobs) !==
            JSON.stringify(response.data.featuredJobs)
              ? response.data.featuredJobs
              : prevJobs
          );
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32 xl:h-48">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="mt-8 lg:mt-12 max-w-screen-xl mx-auto flex flex-col gap-1 md:gap-3">
      <motion.h2
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 12,
          duration: 1,
        }}
        className="text-2xl md:text-4xl lg:text-5xl text-center font-semibold text-gray-700 dark:text-white"
      >
        Jobs Of The Day
      </motion.h2>
      <p className="text-center text-xs md:text-md lg:text-lg text-slate-600 font-semibold dark:text-gray-500">
        Explore the different types of available jobs to apply and discover
        which is right for you.
      </p>

      <div>
        {!allJobs.length ? (
          <div className="h-96 w-full">
            <JobNotFound />
          </div>
        ) : (
          <ul className="mt-4 lg:mt-0 grid sm:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 lg:gap-8 lg:py-6 place-items-center md:px-32 lg:px-32">
            {allJobs
              .slice(0, 8)
              .map((card) =>
                card._id ? <AllJobsCard key={card._id} cardData={card} /> : null
              )}
          </ul>
        )}
      </div>
    </div>
  );
};
