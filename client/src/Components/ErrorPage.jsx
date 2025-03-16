import { NavLink } from "react-router-dom";
import Lottie from "lottie-react";
import errorAnimation from "../test/errorAnimation.json";
import { Navbar } from "./Shared/Navbar";

export const ErrorPage = () => {
  return (
    <>
      <Navbar />
      <div className="h-fit flex flex-col items-center justify-center  dark:bg-zinc-900 p-6">
        {/* Lottie Animation */}
        <Lottie animationData={errorAnimation} className="w-80 h-90"></Lottie>

        {/* Text Content */}
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-4 ">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-center">
          The page you're looking for doesn’t exist. If you think this is a
          mistake, let us know.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <NavLink
            to="/"
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition shadow-md"
          >
            Return Home
          </NavLink>
          <NavLink
            to="/contact"
            className="px-5 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium transition shadow-md"
          >
            Report Problem
          </NavLink>
        </div>
      </div>
    </>
  );
};
