import { motion } from "motion/react";
import { Link } from "react-router-dom";

const useCases = [
  {
    figure: 25,
    title: "Completed Cases",
    description:
      "We always provide people a complete solution upon focused of any business",
  },
  {
    figure: 17,
    title: "Our Office",
    description:
      "We always provide people a complete solution upon focused of any business",
  },
  {
    figure: 86,
    title: "Skilled People",
    description:
      "We always provide people a complete solution upon focused of any business",
  },
  {
    figure: 28,
    title: "Happy Clients",
    description:
      "We always provide people a complete solution upon focused of any business",
  },
];

export const HeroContainer2 = () => {
  return (
    <main>
      <section className="container mx-auto max-w-7xl mt-10 ">
        <div className="grid grid-cols-2 p-3">
          {/* hero-img */}
          <div className="flex overflow-hidden rounded-2xl">
            <motion.img
              initial={{ scale: 1.5 }}
              whileInView={{ scale: 1 }}
              transition={{
                type: "tween",
                duration: 2,
              }}
              src="/images/hero3.webp"
              alt="hero-image"
            />
          </div>

          {/* hero-content */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: "tween",
              duration: 1,
            }}
            className="hero-content px-16 flex flex-col gap-8 "
          >
            {/* hero-heading */}
            <div className="text-5xl font-bold leading-snug dark:text-white ">
              <p className="text-slate-500 text-4xl">Millions Of Jobs.</p>
              Find The One That’s{" "}
              <span className="text-blue-600 dark:text-blue-300 font-bold">
                Right{" "}
              </span>
              For You !
            </div>

            {/* hero-content */}
            <p className="text-gray-500 text-lg leading-tight">
              Search all the open positions on the web. Get your own
              personalized salary estimate. Read reviews on over 600,000
              companies worldwide. The right job is out there.
            </p>

            {/* hero-search */}

            <div className="grid place-items-center ">
              <Link to="/browse" className="w-full">
                <button className="w-full bg-blue-700  p-2 rounded-2xl text-white font-sans text-xl">
                  Search
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: "tween",
            duration: 1,
          }}
          className="p-10 grid grid-cols-4 place-items-center gap-4"
        >
          {useCases.map((cases, index) => {
            return (
              <motion.div key={index} className="flex flex-col gap-2">
                <p className=" p-2 text-center rounded-xl text-blue-400 text-6xl font-extrabold dark:text-blue-300">
                  {cases.figure}K+
                </p>
                <p className=" text-center rounded-xl text-black font-bold text-xl dark:text-white">
                  {cases.title}
                </p>
                <p className="  text-center rounded-xl text-slate-500">
                  {cases.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </main>
  );
};
