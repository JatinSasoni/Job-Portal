import { useSelector } from "react-redux";
import useGetAllJobs from "../../Hooks/getAllJobs";
import { AllJobsCard } from "../Cards/AllJobsCard";
import { useState } from "react";

export const AllJobsSection = () => {
  const [sortOrder, setSortOrder] = useState("newest"); // Default: Newest first
  useGetAllJobs(sortOrder);

  const { allJobs } = useSelector((store) => store.job);

  return (
    <div>
      <div className="flex justify-between py-4 px-2 border-b-2">
        <p className="text-gray-500">
          Showing <span className="text-blue-950">{allJobs?.length}</span> jobs
        </p>
        <div>
          <select
            name="dateFilter"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>
      <div className="">
        <ul className="grid grid-cols-4 gap-8 place-items-center p-6 ">
          {allJobs?.length <= 0 ? (
            <div>No Jobs Found</div>
          ) : (
            allJobs?.map((job, i) => {
              return <AllJobsCard key={i} cardData={job} />;
            })
          )}
        </ul>
      </div>
    </div>
  );
};
