import { SearchBox } from "./SearchBox";
import { AllJobsCard } from "./Cards/AllJobsCard";
import { useEffect, useState } from "react";
import { handleGetAllJobs } from "../../Api/getAPI";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { JobNotFound } from "./JobNotFound";

export const BrowsePage = () => {
  const { searchedQuery } = useSelector((store) => store.job);
  const [allJobs, setAllJobs] = useState([]); // Store all jobs from API
  const [filteredJobs, setFilteredJobs] = useState([]); // Store filtered jobs

  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        const response = await handleGetAllJobs(searchedQuery.keyword);
        if (response.data.SUCCESS) {
          setAllJobs(response.data.allJobs); // Store all jobs first
        }
      } catch (error) {
        toast.error(error.response?.data?.MESSAGE);
      }
    };

    fetchFilteredData();
  }, [searchedQuery]);

  useEffect(() => {
    if (searchedQuery.city) {
      const updatedFilter = allJobs.filter((job) =>
        job?.location
          ?.toLowerCase()
          .includes(searchedQuery?.city?.toLowerCase())
      );
      setFilteredJobs(updatedFilter);
    } else {
      setFilteredJobs(allJobs); // Show all jobs if no city is entered
    }
  }, [searchedQuery.city, allJobs]); // Trigger filtering when `city` or `allJobs` changes

  return (
    <section className="mx-auto max-w-7xl my-8 ">
      {/* JOB SEARCH */}
      <div className="w-1/2 mx-auto">
        <SearchBox />
      </div>
      <div>
        {filteredJobs?.length <= 0 ? (
          <div className="h-96 overflow-hidden">
            <JobNotFound />
          </div>
        ) : (
          <ul className="grid  grid-cols-4 gap-10 place-items-center p-20">
            {filteredJobs?.map((job, i) => {
              return <AllJobsCard key={i} cardData={job} />;
            })}
          </ul>
        )}
      </div>
    </section>
  );
};
