import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaArrowRight } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";
import { motion } from "framer-motion";
import { CiBookmarkCheck } from "react-icons/ci";
import { GoVerified } from "react-icons/go";
import Switch from "../../Switch";

/* eslint-disable react/prop-types */
export const NavProfileBox = ({
  loggedInUser,
  handleLogoutUser,
  setProfileClicked,
}) => {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ opacity: 0, x: 200 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-80 lg:w-96 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 absolute right-2 lg:right-8 flex flex-col gap-4 border dark:border-zinc-700"
    >
      {/* Profile Header with Switch */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Profile Image */}
          <div className="size-10 lg:size-14 rounded-full overflow-hidden border-2 border-blue-500 lg:p-1 shadow-md">
            <img
              src={loggedInUser?.profile?.profilePhoto}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Username & Email */}
          <div>
            <p className="text-md lg:text-lg font-semibold text-gray-900 dark:text-white flex gap-2">
              {loggedInUser?.username?.length > 15
                ? `${loggedInUser?.username?.slice(0, 15)}...`
                : loggedInUser?.username}

              {loggedInUser?.subscription?.status === "active" && (
                <GoVerified className="my-auto text-blue-400" />
              )}
            </p>
            <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
              @
              {loggedInUser?.email?.length > 20
                ? `${loggedInUser?.email?.slice(0, 20)}...`
                : loggedInUser?.email}
            </p>
          </div>
        </div>

        {/* Dark Mode Switch */}
        <Switch />
      </div>

      {/* User Bio */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        {loggedInUser?.profile?.bio || "No bio available."}
      </p>

      {/* Divider */}
      <div className="border-t dark:border-zinc-700 my-2"></div>

      {/* Profile Link */}
      <Link to="/profile" onClick={() => setProfileClicked(false)}>
        <button className="flex items-center justify-between px-5 py-3 bg-gray-100 dark:bg-zinc-800 rounded-xl shadow-md w-full transition hover:scale-105 hover:bg-gray-200 dark:hover:bg-zinc-700">
          <span className="flex items-center gap-3 text-gray-800 dark:text-white">
            <CgProfile className="size-6" /> Profile
          </span>
          <FaArrowRight className="size-4 text-gray-800 dark:text-white" />
        </button>
      </Link>

      {/* Saved Jobs Link (Only for Students) */}
      {loggedInUser?.role === "student" && (
        <Link to="/user/jobs/saved" onClick={() => setProfileClicked(false)}>
          <button className="flex items-center justify-between px-5 py-3 bg-gray-100 dark:bg-zinc-800 rounded-xl shadow-md w-full transition hover:scale-105 hover:bg-gray-200 dark:hover:bg-zinc-700">
            <span className="flex items-center gap-3 text-gray-800 dark:text-white">
              <CiBookmarkCheck className="size-6" /> Saved Jobs
            </span>
            <FaArrowRight className="size-4 text-gray-800 dark:text-white" />
          </button>
        </Link>
      )}

      {/* Logout Button */}
      <button
        className="flex items-center justify-between px-5 py-3 bg-red-50 dark:bg-zinc-800 rounded-xl shadow-md w-full transition hover:scale-105 hover:bg-red-100 dark:hover:bg-zinc-700"
        onClick={handleLogoutUser}
      >
        <span className="flex items-center gap-3 text-red-600 dark:text-red-400">
          <TbLogout2 className="size-6" /> Logout
        </span>
        <FaArrowRight className="size-4 text-red-600 dark:text-red-400" />
      </button>
    </motion.div>
  );
};
