import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { handleGetSavedJobsAPI } from "../../Api/getAPI";
import { JobNotFound } from "./JobNotFound";
import { AllJobsCard } from "./Cards/AllJobsCard";

export const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      setLoading(true);
      try {
        const res = await handleGetSavedJobsAPI();
        if (res.data.SUCCESS) {
          setSavedJobs(res.data.savedJobs);
        }
      } catch (error) {
        toast.error(error.response.data.MESSAGE);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  return (
    <section className="mx-auto max-w-7xl my-8 ">
      <div>
        {savedJobs?.length <= 0 ? (
          <div className="h-96 overflow-hidden">
            <JobNotFound />
          </div>
        ) : (
          <ul className="grid sm:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 lg:gap-8 lg:py-6 place-items-center  md:px-32 lg:px-32 ">
            {savedJobs?.map((job, i) => {
              return <AllJobsCard key={i} cardData={job} />;
            })}
          </ul>
        )}
      </div>
    </section>
  );
};
