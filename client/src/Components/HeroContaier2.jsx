import { motion } from "motion/react";

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
      <section className="container mx-auto max-w-7xl  ">
        <div className="grid grid-cols-2 p-3 mb-8">
          {/* hero-img */}
          <motion.div
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              duration: 2,
            }}
            className="hero-img flex pt-5 "
          >
            <img src="/images/bg2.webp" alt="random" />
          </motion.div>

          {/* hero-content */}
          <div className="hero-content pt-14 px-16 flex flex-col gap-8">
            {/* hero-heading */}
            <h1 className="text-5xl font-bold leading-snug ">
              <p className="text-slate-500 text-4xl">Millions Of Jobs.</p>
              Find The One That’s <span className="text-blue-600 ">Right </span>
              For You !
            </h1>

            {/* hero-content */}
            <p className="text-gray-500 text-lg leading-tight">
              Search all the open positions on the web. Get your own
              personalized salary estimate. Read reviews on over 600,000
              companies worldwide. The right job is out there.
            </p>

            {/* hero-search */}

            <div className="grid place-items-center ">
              <button className="w-full bg-blue-700  p-2 rounded-2xl text-white font-sans text-xl">
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 grid grid-cols-4 place-items-center gap-4">
          {useCases.map((cases, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, y: 150 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  duration: 2,
                }}
                key={index}
                className="flex flex-col gap-2"
              >
                <p className=" p-2 text-center rounded-xl text-blue-800 text-6xl font-extrabold">
                  {cases.figure}K+
                </p>
                <p className=" text-center rounded-xl text-black font-bold text-xl">
                  {cases.title}
                </p>
                <p className="  text-center rounded-xl text-slate-500">
                  {cases.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </main>
  );
};
