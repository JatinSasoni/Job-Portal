import { motion } from "motion/react";
import { useSelector } from "react-redux";
export const LoadingPage = () => {
  const { isDarkMode } = useSelector((store) => store.auth);
  return (
    <>
      <section className={`${isDarkMode && "dark"}`}>
        <div className="h-screen w-screen bg-blue-300 overflow-hidden relative dark:bg-zinc-900 ">
          <div className="relative w-screen h-screen">
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
              className="text-6xl  text-white font-extrabold absolute bottom-32 left-1/2 -translate-x-1/2"
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
