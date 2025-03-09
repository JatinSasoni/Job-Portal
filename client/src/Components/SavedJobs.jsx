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
          <ul className="grid  grid-cols-4 gap-10 place-items-center px-20 py-10">
            {savedJobs?.map((job, i) => {
              return <AllJobsCard key={i} cardData={job} />;
            })}
          </ul>
        )}
      </div>
    </section>
  );
};
