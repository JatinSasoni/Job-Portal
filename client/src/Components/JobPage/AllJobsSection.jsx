import { useSelector } from "react-redux";
import useGetAllJobs from "../../Hooks/getAllJobs";
import { AllJobsCard } from "../Cards/AllJobsCard";
import { useState } from "react";
import { JobNotFound } from "../JobNotFound";
import { motion } from "motion/react";
import Pagination from "./Pagination";

export const AllJobsSection = () => {
  const [sortOrder, setSortOrder] = useState("newest"); // Default: Newest first
  useGetAllJobs(sortOrder, "allJobsPage");

  const { allJobs } = useSelector((store) => store.job);
  const { loading } = useSelector((store) => store.auth);

  return (
    <div className="w-full px-4 max-lg:mt-2">
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
            className=" rounded-md outline-none  dark:bg-zinc-900 px-2 bg-zinc-50"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>
      <div className="max-lg:mt-4">
        {allJobs?.length <= 0 ? (
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ type: "tween" }}
            className=" w-full  h-96"
          >
            <JobNotFound />
          </motion.div>
        ) : loading ? (
          <div className="flex justify-center items-center h-96 w-full">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <ul className="grid sm:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 lg:gap-8 lg:py-6 place-items-center  md:px-32 lg:px-0 overflow-x-hidden">
            {allJobs?.map((job, i) => {
              return <AllJobsCard key={i} cardData={job} />;
            })}
          </ul>
        )}
        {allJobs?.length > 0 && <Pagination scope="allJobsPage" />}
      </div>
    </div>
  );
};
