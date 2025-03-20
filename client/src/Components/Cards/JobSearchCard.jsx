import { SearchBox } from "../SearchBox";
import { motion } from "motion/react";

export const JobSearchCard = () => {
  return (
    <section>
      {/* JOB HEADER || SEARCH */}
      <motion.div className="flex flex-col gap-4 m-1 dark:text-white">
        {/* content */}
        <div className=" flex flex-col gap-2 p-2 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "tween",
              duration: 1,
            }}
            className="text-center text-gray-700 text-3xl font-semibold dark:text-zinc-200 leading-5"
          >
            Talent Meets{" "}
            <p className="text-blue-400 text-5xl dark:text-blue-300 font-extrabold text-center">
              Opportunity!
            </p>
          </motion.div>
          <p className="text-center text-slate-900 text-sm dark:text-zinc-300 max-w-lg">
            Find your dream job with our powerful job search platform and browse
            thousands of openings and apply with ease!
          </p>
        </div>

        {/* JOB SEARCH */}
        <div className="w-full px-2 md:p-0 md:w-1/2 mx-auto">
          <SearchBox />
        </div>
      </motion.div>
    </section>
  );
};
