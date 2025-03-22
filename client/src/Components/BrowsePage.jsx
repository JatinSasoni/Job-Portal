import { SearchBox } from "./SearchBox";
import { AllJobsCard } from "./Cards/AllJobsCard";
import { useEffect, useState } from "react";
import { handleGetAllJobs } from "../../Api/getAPI";
import { shallowEqual, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { JobNotFound } from "./JobNotFound";
import { motion } from "motion/react";

export const BrowsePage = () => {
  const { searchedQuery } = useSelector((store) => store.job, shallowEqual);
  const [allJobs, setAllJobs] = useState([]); // Store all jobs from API

  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        const response = await handleGetAllJobs(searchedQuery.keyword, 1, 20);
        if (response.data.SUCCESS) {
          //IF DATA CHANGED ONLY THEN
          JSON.stringify(response.data.allJobs) !== JSON.stringify(allJobs) &&
            setAllJobs(response.data.allJobs); // Store all jobs first
        }
      } catch (error) {
        toast.error(error.response?.data?.MESSAGE);
      }
    };

    fetchFilteredData();
  }, [searchedQuery]);

  const displayedJobs = searchedQuery?.city
    ? allJobs.filter((job) =>
        job?.location
          ?.toLowerCase()
          .includes(searchedQuery?.city?.toLowerCase())
      )
    : allJobs;

  return (
    <section className="mx-auto max-w-7xl md:my-8  ">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "tween",
          duration: 1,
        }}
        className="text-center text-blue-950 text-2xl md:text-4xl font-semibold dark:text-zinc-200 mt-3 md:mb-8"
      >
        Explore Top Opportunities & Advance Your Career
      </motion.h1>
      {/* JOB SEARCH */}
      <div className="w-full md:w-1/2 px-4 md:px-0 mx-auto">
        <SearchBox />
      </div>
      <div className="mt-8 xl:mt-4">
        {displayedJobs?.length <= 0 ? (
          <div className="h-96 overflow-hidden">
            <JobNotFound />
          </div>
        ) : (
          <ul className="grid sm:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 lg:gap-8 lg:py-6 place-items-center  md:px-32 lg:px-32 ">
            {displayedJobs?.map((job, i) => {
              return <AllJobsCard key={i} cardData={job} />;
            })}
          </ul>
        )}
      </div>
    </section>
  );
};
