import { motion, useScroll } from "motion/react";

const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        originX: 0,
      }}
      className="w-full h-1 rounded-2xl z-50 bg-blue-600 dark:bg-blue-300 "
    ></motion.div>
  );
};

export default ProgressBar;
