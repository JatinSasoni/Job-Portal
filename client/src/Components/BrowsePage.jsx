import { SearchBox } from "./SearchBox";
import { AllJobsCard } from "./Cards/AllJobsCard";
import { useEffect, useState } from "react";
import { handleGetAllJobs } from "../../Api/getAPI";
import { useSelector } from "react-redux";

export const BrowsePage = () => {
  const { searchedQuery } = useSelector((store) => store.job);
  const [allJobs, setAllJobs] = useState([]); // Store all jobs from API
  const [filteredJobs, setFilteredJobs] = useState([]); // Store filtered jobs

  useEffect(() => {
    const fetchFilteredData = async () => {
      const response = await handleGetAllJobs(searchedQuery.keyword);
      if (response.data.SUCCESS) {
        setAllJobs(response.data.allJobs); // Store all jobs first
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
    <section className="mx-auto max-w-7xl my-8">
      {/* JOB SEARCH */}
      <div className="w-1/2 mx-auto">
        <SearchBox />
      </div>
      <div className="">
        <ul className="grid  grid-cols-3 gap-10 place-items-center p-10">
          {filteredJobs?.length <= 0 ? (
            <div>No Jobs Found</div>
          ) : (
            filteredJobs?.map((job, i) => {
              return <AllJobsCard key={i} cardData={job} />;
            })
          )}
        </ul>
      </div>
    </section>
  );
};
