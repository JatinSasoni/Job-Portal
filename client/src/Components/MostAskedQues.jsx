/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { jobSeekerFAQ, recruiterFAQ } from "../../util/MostAskedQues";
import { motion } from "motion/react";

const FAQBox = ({ data, openedIndex, handleDropdownClick, type }) => {
  return (
    <div className="flex flex-col gap-3">
      {data?.map((curr, index) => (
        <div
          key={index}
          className="border p-2  dark:bg-zinc-800 rounded-xl drop-shadow-md "
        >
          <div className="flex justify-between">
            <p className="text-zinc-900 dark:text-gray-100 text-md font-medium">
              {curr.ques}
            </p>
            <button
              onClick={() => handleDropdownClick(index, type)}
              aria-expanded={openedIndex === index}
              aria-label={`Toggle answer for ${curr.ques}`}
              className="hover:scale-110 transition-transform"
            >
              <FaAngleDown
                className={`size-6 transition-transform dark:text-white ${
                  openedIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={
              openedIndex === index
                ? { opacity: 1, height: "auto" }
                : { opacity: 0, height: 0 }
            }
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden text-zinc-700 dark:text-gray-300"
          >
            {curr.ans}
          </motion.p>
        </div>
      ))}
    </div>
  );
};

export const MostAskedQues = () => {
  const [openedIndexRec, setOpenedIndexRec] = useState(null);
  const [openedIndexSeeker, setOpenedIndexSeeker] = useState(null);

  const handleDropdownClick = (index, type) => {
    if (type === "seeker") {
      setOpenedIndexSeeker(openedIndexSeeker === index ? null : index);
    } else {
      setOpenedIndexRec(openedIndexRec === index ? null : index);
    }
  };

  return (
    <section>
      <div className="max-w-7xl mx-auto my-16">
        <motion.h1
          initial={{
            y: 50,
          }}
          whileInView={{
            y: 0,
          }}
          transition={{
            duration: 1.2,
          }}
          className="text-4xl dark:text-white my-16 font-semibold text-gray-700"
        >
          Frequently Asked
        </motion.h1>
        <div className="grid grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ type: "tween", duration: 1 }}
          >
            <h3 className="my-2 text-3xl text-gray-700 font-semibold dark:text-white text-center">
              For Recruiters
            </h3>
            <FAQBox
              data={recruiterFAQ}
              openedIndex={openedIndexRec}
              handleDropdownClick={handleDropdownClick}
              type="recruiter"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ type: "tween", duration: 1 }}
          >
            <h3 className="my-2 text-3xl text-gray-700 font-semibold dark:text-white text-center">
              For Job-Seekers
            </h3>
            <FAQBox
              data={jobSeekerFAQ}
              openedIndex={openedIndexSeeker}
              handleDropdownClick={handleDropdownClick}
              type="seeker"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
