import Lottie from "lottie-react";
import errorAnimation from "../LottieAssets/errorAnimation.json";
import { Navbar } from "./Shared/Navbar";

export const OfflinePage = () => {
  return (
    <>
      <Navbar />
      <div className="h-fit flex flex-col items-center justify-center dark:bg-zinc-900 p-6 min-h-screen">
        {/* Lottie Animation */}
        <Lottie animationData={errorAnimation} className="w-80 h-90"></Lottie>

        {/* Text Content */}
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-4 max-md:text-center">
          You're Offline
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-center max-w-md">
          Your network connection is off. Please check your internet connection and try again.
        </p>

        {/* Retry Button */}
        <div className="mt-6">
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition shadow-md"
          >
            Retry
          </button>
        </div>
      </div>
    </>
  );
};