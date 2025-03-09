import { SearchBox } from "./SearchBox";
import { AllJobsCard } from "./Cards/AllJobsCard";
import { useEffect, useState } from "react";
import { handleGetAllJobs } from "../../Api/getAPI";
import { shallowEqual, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { JobNotFound } from "./JobNotFound";

export const BrowsePage = () => {
  const { searchedQuery } = useSelector((store) => store.job, shallowEqual);
  const [allJobs, setAllJobs] = useState([]); // Store all jobs from API

  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        const response = await handleGetAllJobs(searchedQuery.keyword);
        if (response.data.SUCCESS) {
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
    <section className="mx-auto max-w-7xl my-8 ">
      {/* JOB SEARCH */}
      <div className="w-1/2 mx-auto">
        <SearchBox />
      </div>
      <div>
        {displayedJobs?.length <= 0 ? (
          <div className="h-96 overflow-hidden">
            <JobNotFound />
          </div>
        ) : (
          <ul className="grid  grid-cols-4 gap-10 place-items-center px-20 py-10">
            {displayedJobs?.map((job, i) => {
              return <AllJobsCard key={i} cardData={job} />;
            })}
          </ul>
        )}
      </div>
    </section>
  );
};
