import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const useCases = [
  {
    figure: 25,
    title: "Cases",
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
    title: "Clients",
    description:
      "We always provide people a complete solution upon focused of any business",
  },
];

export const HeroContainer2 = () => {
  return (
    <main>
      <section className="container mx-auto max-w-7xl mt-10 ">
        <div className="grid md:grid-cols-2 p-3">
          {/* hero-img */}
          <div className="hidden md:flex overflow-hidden rounded-2xl ">
            <motion.img
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "tween",
                duration: 1.5,
              }}
              className="w-full h-auto"
              src="/images/hero3.webp"
              alt="hero-image"
              loading="lazy"
            />
          </div>

          {/* hero-content */}
          <motion.div
            initial={{ opacity: 0, translateY: 50 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="hero-content px-2 md:px-14 lg:px-16 flex flex-col md:gap-1 xl:gap-5 "
          >
            {/* hero-heading */}
            <div className="text-4xl md:leading-tight lg:text-5xl font-bold lg:leading-snug xl:text-5xl dark:text-white ">
              <p className="text-slate-500 text-sm md:text-md lg:text-4xl">
                Millions Of Jobs.
              </p>
              Find The One That’s{" "}
              <span className="text-blue-600 dark:text-blue-300 font-bold">
                Right{" "}
              </span>
              For You !
            </div>

            {/* hero-content */}
            <p className="text-gray-500 text-xs md:text-xs leading-tight my-2 md:my-0 xl:text-xl">
              Search all the open positions on the web. Get your own
              personalized salary estimate. Read reviews on over 600,000
              companies worldwide. The right job is out there.
            </p>

            {/* hero-search */}

            <div className="grid place-items-center ">
              <Link to="/browse" className="w-full">
                <button className="w-full bg-blue-700 p-2 rounded-2xl text-white font-sans md:text-xl">
                  Search Now
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.2 }}
          className="px-2 md:p-6 lg:p-10 grid grid-cols-4 place-items-center gap-1 md:gap-4"
        >
          {useCases.map((cases, index) => {
            return (
              <motion.div
                variants={{
                  hidden: { opacity: 0, translateY: 50 },
                  visible: { opacity: 1, translateY: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                key={index}
                className="flex flex-col gap-1 md:gap-2"
              >
                <p className=" p-1 md:p-2 text-center rounded-xl text-blue-500 text-3xl md:text-5xl lg:text-6xl font-extrabold dark:text-blue-300">
                  {cases.figure}K+
                </p>
                <p className=" text-center rounded-xl text-black font-bold text-xs md:text-md lg:text-xl dark:text-white">
                  {cases.title}
                </p>
                <p className="  text-center rounded-xl text-slate-500 text-xs leading-tight md:text-sm lg:text-md xl:text-lg">
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
