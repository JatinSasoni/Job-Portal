import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { handleGetSavedJobsAPI } from "../../Api/getAPI";
import { JobNotFound } from "./JobNotFound";
import { AllJobsCard } from "./Cards/AllJobsCard";

export const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedJobs = async () => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center max-sm:h-[calc(100vh-72px)]  sm:h-[calc(100vh-112px)]">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl my-8 ">
      <div>
        {savedJobs?.length <= 0 ? (
          <>
            <h2 className="text-center text-zinc-700 dark:text-slate-50 text-2xl md:text-4xl">
              You don't have any Job post saved
            </h2>
            <div className="h-96 overflow-hidden">
              <JobNotFound />
            </div>
          </>
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
