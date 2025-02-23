import { NavLink } from "react-router-dom";
import { SearchBox } from "./SearchBox";
import { motion } from "motion/react";

export const HeroContainer = () => {
  return (
    <main>
      <section className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-2 p-3 my-4">
          <div className=" pt-14 px-16 flex flex-col gap-4">
            {/* hero-heading */}
            <motion.h1
              initial={{
                opacity: 0,
                y: 100,
              }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                duration: 1,
              }}
              className="text-5xl font-bold"
            >
              The <span className="text-blue-600 ">Easiest Way </span>
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
                type: "spring",
                duration: 1,
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
            <p>
              Popular Searches :
              <span className="text-gray-500">
                <NavLink to="/browse">
                  Designer, Web, IOS, Developer, PHP, Senior, Engineer,
                </NavLink>
              </span>
            </p>
          </div>

          {/* hero-img */}

          <motion.div
            initial={{ opacity: 0, x: 150 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              duration: 1,
              delay: 0.1,
            }}
            className="hero-img [&>img]:w-[500px] grid place-items-center"
          >
            <img src="/images/network.webp" alt="hero-img" />
          </motion.div>
        </div>

        {/* SHAPE DIVIDER */}
      </section>
    </main>
  );
};
