import { motion } from "motion/react";
import { Signup } from "./Signup";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const RegisterPage = () => {
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
      <div className="flex h-screen ">
        {/* Left Section with Image and Curve  ---- xl:block*/}
        <div className="w-1/2 hidden xl:block relative overflow-hidden ">
          <div className="absolute inset-0 bg-zinc-800 opacity-90">
            <div className="py-20 px-4">
              <div className="size-48 grid place-items-center">
                <img src="/Logo/newlogodark.png" alt="" />
              </div>
              <motion.h2
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "tween",
                  duration: 1,
                }}
                className="text-5xl font-medium text-gray-100 "
              >
                Job Hunting Made
                <span className="font-extrabold"> Simple</span>, Hiring Made
                <span className="font-extrabold"> Smarter!</span>
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "tween",
                  duration: 1,
                }}
                className="h-44 pt-16 px-14 "
              >
                <Link to="/">
                  <button className="hover:scale-105 rounded-ring ring-2 ring-white py-3 px-6 rounded-3xl w-1/2 text-white bg-blue-400 hover:bg-blue-500  transition duration-300">
                    Home
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
          {/* Overlay */}

          <div
            className="absolute inset-y-0 right-0 w-1/6 bg-zinc-50 border-none dark:bg-zinc-900"
            style={{
              clipPath: "polygon(100% 0, 0% 100%, 100% 100%)",
              border: "none",
              outline: "none",
              boxShadow: "none",
              WebkitClipPath: "polygon(100% 0, 0% 100%, 100% 100%)",
            }}
          ></div>
          {/* Bend Divider */}
        </div>

        {/* Right Section with Form */}
        <div className="w-full xl:w-1/2 flex xl:items-center justify-center">
          <Signup />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
