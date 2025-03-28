import { motion } from "motion/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
export const LoadingPage = () => {
  const { isDarkMode } = useSelector((store) => store.auth);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <>
      <section className={`bg-blue-300 overflow-hidden  dark:bg-zinc-900 `}>
        <div className="ml-8 md:ml-0 h-screen w-screen relative">
          <div className=" relative w-screen h-screen hidden xl:block">
            <motion.div
              initial={{
                y: 200,
                x: -300,
                scale: 0,
              }}
              animate={{
                x: -300,
                y: 0,
                scale: 1.1,
              }}
              transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
              className="text-6xl  w-full text-white font-extrabold absolute bottom-32 left-1/2 -translate-x-1/2"
            >
              <h1>Welcome to TalentNest</h1>
            </motion.div>
          </div>

          <div className="box-of-star1">
            <div className="star star-position1"></div>
            <div className="star star-position2"></div>
            <div className="star star-position3"></div>
            <div className="star star-position4"></div>
            <div className="star star-position5"></div>
            <div className="star star-position6"></div>
            <div className="star star-position7"></div>
          </div>

          <div className="box-of-star2">
            <div className="star star-position1"></div>
            <div className="star star-position2"></div>
            <div className="star star-position3"></div>
            <div className="star star-position4"></div>
            <div className="star star-position5"></div>
            <div className="star star-position6"></div>
            <div className="star star-position7"></div>
          </div>
          <div className="box-of-star3">
            <div className="star star-position1"></div>
            <div className="star star-position2"></div>
            <div className="star star-position3"></div>
            <div className="star star-position4"></div>
            <div className="star star-position5"></div>
            <div className="star star-position6"></div>
            <div className="star star-position7"></div>
          </div>
          <div className="box-of-star4">
            <div className="star star-position1"></div>
            <div className="star star-position2"></div>
            <div className="star star-position3"></div>
            <div className="star star-position4"></div>
            <div className="star star-position5"></div>
            <div className="star star-position6"></div>
            <div className="star star-position7"></div>
          </div>
          <div data-js="astro" className="astronaut">
            <div className="head"></div>
            <div className="arm arm-left"></div>
            <div className="arm arm-right"></div>
            <div className="body">
              <div className="panel"></div>
            </div>
            <div className="leg leg-left"></div>
            <div className="leg leg-right"></div>
            <div className="schoolbag"></div>
          </div>
        </div>
      </section>
    </>
  );
};
