import { TopRecruitersCard } from "./Cards/TopRecruitersCard";
import { motion } from "motion/react";

/* eslint-disable react/prop-types */
export const TopRecruiters = ({ topRecruiterData }) => {
  return (
    <section>
      <div className="container mx-auto max-w-screen-xl mt-20">
        <div>
          <div className=" container max-w-screen-xl mx-auto flex flex-col gap-6">
            {/* TITLE */}
            <h2 className="text-5xl text-blue-950 text-center font-semibold dark:text-white">
              Top Recruiters
            </h2>

            <p className="text-center text-slate-600 font-semibold dark:text-slate-500">
              Discover your next career move, freelance gig, or internship
            </p>

            {/* JOB GRIDS */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", duration: 1.5 }}
              className="grid grid-cols-4  p-6 gap-4 place-items-center"
            >
              {topRecruiterData?.map((card, index) => {
                return <TopRecruitersCard key={index} cardData={card} />;
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
