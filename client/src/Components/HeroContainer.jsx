import { NavLink } from "react-router-dom";
import { SearchBox } from "./SearchBox";
import { motion } from "motion/react";

export const HeroContainer = () => {
  return (
    <main>
      <section className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-2 p-3 ">
          <div className=" pt-14 px-16 flex flex-col gap-4">
            {/* hero-heading */}
            <motion.h1
              initial={{
                opacity: 0,
                y: 100,
              }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.1,
              }}
              className="text-5xl font-semibold dark:text-white "
            >
              The{" "}
              <p className="text-blue-400 font-extrabold dark:text-blue-300 inline-block">
                Easiest Way{" "}
              </p>
              To Get Your New Job
            </motion.h1>

            {/* hero-content */}
            <motion.p
              initial={{
                opacity: 0,
                y: 100,
              }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.1,
              }}
              className="text-gray-500 text-lg leading-tight"
            >
              Each month, more than 3 million job seekers turn to website in
              their search for work, making over 140,000 applications every
              single day
            </motion.p>

            {/* hero-search */}
            <SearchBox />

            {/* popular search */}
            <p className="dark:text-white">
              Popular Searches :
              <span className="text-gray-500 ">
                <NavLink to="/browse">
                  Designer, Web, IOS, Developer, PHP, Senior, Engineer,
                </NavLink>
              </span>
            </p>
          </div>

          {/* hero-img */}

          <motion.div className="hero-img [&>img]:w-[500px] grid place-items-center drop-shadow-lg overflow-hidden ">
            <img src="/images/network.webp" alt="hero-img" />
          </motion.div>
        </div>

        {/* SHAPE DIVIDER */}
      </section>
    </main>
  );
};
