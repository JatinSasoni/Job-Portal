/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { jobSeekerFAQ, recruiterFAQ } from "../../util/MostAskedQues";
import { motion } from "framer-motion";

const FAQBox = ({ data, openedIndex, handleDropdownClick, type }) => {
  return (
    <div className="flex flex-col gap-3">
      {data?.map((curr, index) => (
        <div
          onClick={() => handleDropdownClick(index, type)}
          key={index}
          className="border p-2  dark:bg-zinc-800 rounded-xl shadow-md dark:border-none px-3"
        >
          <div className="flex justify-between">
            <p className="text-zinc-900 dark:text-gray-100 text-sm md:text-md font-medium">
              {curr.ques}
            </p>
            <button
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
          <p
            className={`overflow-hidden text-sm md:text-md text-zinc-700 dark:text-gray-300 transition-all duration-300 ${
              openedIndex === index
                ? "max-h-40 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            {curr.ans}
          </p>
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
      setOpenedIndexSeeker((prev) => (prev === index ? null : index));
    } else {
      setOpenedIndexRec((prev) => (prev === index ? null : index));
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-8 mb-14">
      <h1 className="text-3xl md:text-5xl dark:text-white my-2 lg:my-16  text-gray-700 text-center font-semibold">
        Frequently Asked
      </h1>
      <div className="grid lg:grid-cols-2 gap-6 overflow-hidden lg:overflow-visible px-3 lg:px-0">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "tween", duration: 0.6, ease: "easeOut" }}
        >
          <h3 className="my-2 text-2xl lg:text-3xl text-gray-700 font-semibold dark:text-white text-center">
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
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "tween", duration: 0.6, ease: "easeOut" }}
        >
          <h3 className="my-2 text-2xl lg:text-3xl text-gray-700 font-semibold dark:text-white text-center">
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
  );
};
