import { TopRecruitersCard } from "./Cards/TopRecruitersCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { handleGetTopRecruiters } from "../../Api/getAPI";
import { JobNotFound } from "./JobNotFound";

/* eslint-disable react/prop-types */
export const TopRecruiters = () => {
  const [topRecruiterData, setTopRecruiter] = useState([]);

  useEffect(() => {
    const getTopRecruiters = async () => {
      try {
        const response = await handleGetTopRecruiters();
        if (response.data.SUCCESS) {
          setTopRecruiter(response.data.topRecruiters);
        }
      } catch (error) {
        toast.error(error.response.data.MESSAGE);
      }
    };

    getTopRecruiters();
  }, []);

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "tween" }}
        className="container mx-auto max-w-screen-xl mt-10"
      >
        <div>
          <div className=" container max-w-screen-xl mx-auto flex flex-col md:gap-3">
            {/* TITLE */}
            <h2 className="text-3xl md:text-5xl text-center font-semibold text-gray-700 dark:text-white">
              Top Recruiters
            </h2>

            <p className="text-center text-sm md:text-md text-slate-600 font-semibold dark:text-slate-500">
              Discover your next career move, freelance gig, or internship
            </p>

            {/* JOB GRIDS */}
            {topRecruiterData.length ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-4 p-6 gap-4 place-items-center">
                {topRecruiterData?.map((card, index) => {
                  return <TopRecruitersCard key={index} cardData={card} />;
                })}
              </div>
            ) : (
              <div className="h-96 w-full">
                <JobNotFound />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
