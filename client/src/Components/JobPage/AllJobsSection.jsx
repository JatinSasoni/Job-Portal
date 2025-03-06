import { useSelector } from "react-redux";
import useGetAllJobs from "../../Hooks/getAllJobs";
import { AllJobsCard } from "../Cards/AllJobsCard";
import { useState } from "react";
import { JobNotFound } from "../JobNotFound";
import { motion } from "motion/react";

export const AllJobsSection = () => {
  const [sortOrder, setSortOrder] = useState("newest"); // Default: Newest first
  useGetAllJobs(sortOrder);

  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="w-full">
      <div className="flex justify-between py-4 px-2 border-b-2 ">
        <p className="text-gray-500 dark:text-white text-md">
          Showing{" : "}
          <span className="text-blue-950 font-bold text-bold dark:text-blue-400 text-md">
            {allJobs?.length} JOBS
          </span>
        </p>
        <div>
          <select
            name="dateFilter"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className=" rounded-md outline-none  dark:bg-zinc-900 px-2"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>
      <div>
        {allJobs?.length <= 0 ? (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className=" w-full  h-96 "
          >
            <JobNotFound />
          </motion.div>
        ) : (
          <ul className="grid grid-cols-4 gap-8 place-items-center p-6 ">
            {allJobs?.map((job, i) => {
              return <AllJobsCard key={i} cardData={job} />;
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
