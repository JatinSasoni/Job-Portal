import { SearchBox } from "../SearchBox";
import { motion } from "motion/react";

export const JobSearchCard = () => {
  return (
    <section>
      {/* JOB HEADER || SEARCH */}
      <motion.div className="py-8 flex flex-col gap-4 my-10 rounded-2xl shadow-md dark:shadow-white dark:text-white dark:bg-blue-950 ">
        {/* content */}
        <div className=" flex flex-col gap-2 max-w-96 mx-auto">
          <p className="text-center text-3xl font-extrabold">
            <span className="text-blue-900  dark:text-blue-500">22 Jobs</span>{" "}
            Available Now
          </p>
          <p className="text-center text-slate-900 text-sm dark:text-white">
            Find your dream job with our powerful job search platform—browse
            thousands of openings and apply with ease!
          </p>
        </div>

        {/* JOB SEARCH */}
        <div className="w-1/2 mx-auto">
          <SearchBox />
        </div>
      </motion.div>
    </section>
  );
};
