import { useSelector } from "react-redux";
import useGetAllJobs from "../../Hooks/getAllJobs";
import { AllJobsCard } from "../Cards/AllJobsCard";
import { useState } from "react";
import { JobNotFound } from "../JobNotFound";

export const AllJobsSection = () => {
  const [sortOrder, setSortOrder] = useState("newest"); // Default: Newest first
  useGetAllJobs(sortOrder);

  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="w-full">
      <div className="flex justify-between py-4 px-2 border-b-2 ">
        <p className="text-gray-500 dark:text-white">
          Showing{" "}
          <span className="text-blue-950 dark:text-blue-500">
            {allJobs?.length}
          </span>{" "}
          jobs
        </p>
        <div>
          <select
            name="dateFilter"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="dark:text-black rounded-md outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>
      <div>
        {allJobs?.length <= 0 ? (
          <div className=" w-full  h-96 ">
            <JobNotFound />
          </div>
        ) : (
          <ul className="grid grid-cols-4 gap-8 place-items-center p-6 ">
            {allJobs?.map((job, i) => {
              return <AllJobsCard key={i} cardData={job} />;
            })}
          </ul>
        )}
        {/* {allJobs?.length <= 0 ? (
          <div>Job Not Found</div>
        ) : (
          allJobs?.map((job, i) => {
            return <AllJobsCard key={i} cardData={job} />;
          })
        )} */}
      </div>
    </div>
  );
};
