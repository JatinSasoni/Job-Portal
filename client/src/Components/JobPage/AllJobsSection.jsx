import { AllJobsCard } from "../Cards/AllJobsCard";

const dummy = [1, 2, 3, 4, 5, 6, 3, 2];

export const AllJobsSection = () => {
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
          {dummy.map((d, i) => {
            return <AllJobsCard key={i} />;
          })}
        </ul>
      </div>
    </div>
  );
};
