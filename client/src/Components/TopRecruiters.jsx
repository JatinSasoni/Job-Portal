import { useSelector } from "react-redux";
import { TopRecruitersCard } from "./Cards/TopRecruitersCard";
import { motion } from "motion/react";

/* eslint-disable react/prop-types */
export const TopRecruiters = () => {
  const { allJobs: topRecruiterData } = useSelector((store) => store.job);
  console.log(topRecruiterData[0]);

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "tween" }}
        className="container mx-auto max-w-screen-xl mt-10"
      >
        <div>
          <div className=" container max-w-screen-xl mx-auto flex flex-col gap-3">
            {/* TITLE */}
            <h2 className="text-5xl  text-center font-semibold text-gray-700 dark:text-white">
              Top Recruiters
            </h2>

            <p className="text-center text-slate-600 font-semibold dark:text-slate-500">
              Discover your next career move, freelance gig, or internship
            </p>

            {/* JOB GRIDS */}
            <div className="grid grid-cols-4  p-6 gap-4 place-items-center">
              {topRecruiterData?.map((card, index) => {
                return <TopRecruitersCard key={index} cardData={card} />;
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
