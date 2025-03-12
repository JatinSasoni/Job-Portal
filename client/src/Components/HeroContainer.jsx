import { NavLink } from "react-router-dom";
import { SearchBox } from "./SearchBox";
import { motion } from "motion/react";

export const HeroContainer = () => {
  return (
    <main>
      <section className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 p-3 ">
          <div className=" md:pt-4 md:px-2 xl:pt-12 xl:px-14 flex flex-col gap-2 px-4">
            {/* hero-heading */}
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className=" text-3xl lg:text-5xl leading-7  font-semibold dark:text-white text-center sm:text-left lg:text-left"
            >
              The{" "}
              <span className="text-blue-400 font-extrabold dark:text-blue-300 inline-block">
                Easiest Way
              </span>{" "}
              To Get Your New Job
            </motion.h1>

            {/* hero-content */}
            <motion.p
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.1 }}
              className="text-gray-500 text-[12px] md:text-sm lg:text-lg leading-tight text-center md:text-left"
            >
              Each month, more than 3 million job seekers turn to website in
              their search for work, making over 140,000 applications every
              single day
            </motion.p>

            {/* hero-search */}
            <SearchBox />

            {/* popular search */}
            <p className="dark:text-white text-xs md:text-lg">
              Popular Searches :
              <span className="text-gray-500 text-[12px] sm:text-sm md:text-md lg:text-lg ">
                <NavLink to="/browse">
                  Designer, Web, IOS, Developer, PHP, Senior, Engineer,
                </NavLink>
              </span>
            </p>
          </div>

          {/* hero-img */}

          <div className="hero-img hidden md:[&>img]:w-[350px] sm:grid lg:[&>img]:w-[430px] xl:[&>img]:w-[500px] place-items-center drop-shadow-xl overflow-hidden ">
            <img src="/images/network.webp" alt="hero-img" />
          </div>
        </div>

        {/* SHAPE DIVIDER */}
      </section>
    </main>
  );
};
