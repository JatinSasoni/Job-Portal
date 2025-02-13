import { useSelector } from "react-redux";
import useGetAllJobs from "../../Hooks/getAllJobs";
import { AllJobsCard } from "../Cards/AllJobsCard";

export const AllJobsSection = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div>
      <div className="flex justify-between py-4 px-2 border-b-2">
        <p className="text-gray-500">
          Showing <span className="text-blue-950">255 </span> jobs
        </p>
        <div>
          <p>Sort by: Newest Post</p>
        </div>
      </div>
      <div className="">
        <ul className="grid  grid-cols-3 gap-10 place-items-center p-10">
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
