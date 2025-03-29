import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCases } from "../../util/UseCases";

export const HeroContainer2 = () => {
  return (
    <main>
      <section className="container mx-auto max-w-7xl mt-10">
        <div className="grid md:grid-cols-2 p-3">
          {/* Hero Image */}
          <div className="hidden md:flex overflow-hidden rounded-2xl">
            <motion.img
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ type: "tween", duration: 1.5 }}
              className="w-full h-auto"
              src="/images/hero3.webp"
              alt="Explore jobs and careers"
              loading="lazy"
            />
          </div>

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, translateY: 50 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="hero-content px-4 md:px-14 lg:px-16 flex flex-col gap-3 xl:gap-5"
          >
            {/* Hero Heading */}
            <div className="text-center md:text-left text-gray-700 dark:text-white">
              <p className="text-slate-500 text-sm md:text-md lg:text-4xl">
                Millions Of Jobs.
              </p>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight lg:leading-snug">
                Find The One That’s{" "}
                <span className="text-blue-400 dark:text-blue-300">Right</span>{" "}
                For You!
              </h1>
            </div>

            {/* Hero Description */}
            <p className="text-gray-500 text-center md:text-left text-[12px] md:text-xs leading-tight xl:text-xl">
              Search all the open positions on the web. Get your own
              personalized salary estimate. Read reviews on over 600,000
              companies worldwide. The right job is out there.
            </p>

            {/* Hero Search Button */}
            <div className="grid place-items-center">
              <Link to="/browse" className="w-full">
                <button
                  aria-label="Search job opportunities"
                  className="w-full bg-blue-400 p-1 md:p-3 rounded-2xl text-white font-sans text-lg md:text-xl transition-transform hover:scale-105"
                >
                  Search Opportunity
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Use Cases Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.3 }}
          className="px-4 mt-5 sm:mt-0 md:p-6 lg:p-10 grid sm:grid-cols-4 place-items-center gap-4 md:gap-6 w-3/4 sm:w-full mx-auto"
        >
          {useCases?.length > 0 ? (
            useCases.map((cases, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, translateY: 50 },
                  visible: { opacity: 1, translateY: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col gap-1 md:gap-2 p-2  dark:shadow-white rounded-xl"
              >
                <p className="p-2 text-center rounded-xl text-blue-400 text-3xl md:text-5xl lg:text-6xl font-extrabold dark:text-blue-300">
                  {cases.figure}K+
                </p>
                <p className="text-center font-bold text-xs md:text-md lg:text-xl dark:text-white">
                  {cases.title}
                </p>
                <p className="text-center text-slate-500 text-xs leading-tight md:text-sm lg:text-md xl:text-[15px]">
                  {cases.description}
                </p>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 text-center text-md">
              No data available
            </p>
          )}
        </motion.div>
      </section>
    </main>
  );
};
