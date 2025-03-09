import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaArrowRight } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";
import { motion } from "framer-motion";
import { CiBookmarkCheck } from "react-icons/ci";
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
      className="w-96 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 absolute right-8 flex flex-col gap-4 dark:shadow-white dark:shadow-sm"
    >
      {/* Profile Header with Switch */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-12 rounded-full overflow-hidden border-2 border-blue-500 p-1">
            <img
              src={loggedInUser?.profile?.profilePhoto}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              ~
              {loggedInUser?.username?.length > 15
                ? `${loggedInUser?.username?.slice(0, 15)}...`
                : loggedInUser?.username}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              @
              {loggedInUser?.email?.length > 20
                ? `${loggedInUser?.email?.slice(0, 15)}...`
                : loggedInUser?.email}
            </p>
          </div>
        </div>
        {/* Switch Component */}
        <div className="ml-4">
          <Switch />
        </div>
      </div>

      {/* User Bio */}
      <p className="text-sm text-gray-500 dark:text-gray-400 ">
        {loggedInUser?.profile?.bio}
      </p>

      {/* Profile Link */}
      <Link to="/profile" onClick={() => setProfileClicked(false)}>
        <button className="flex items-center justify-between px-5 py-3 bg-blue-50 dark:bg-zinc-800 rounded-xl shadow-md w-full transition hover:scale-105 hover:bg-blue-100 dark:hover:bg-zinc-700">
          <span className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
            <CgProfile className="size-6" /> Profile
          </span>
          <FaArrowRight className="size-4 text-blue-600 dark:text-blue-400" />
        </button>
      </Link>

      {/* Saved Jobs Link */}
      {loggedInUser?.role === "student" && (
        <Link to="/user/jobs/saved" onClick={() => setProfileClicked(false)}>
          <button className="flex items-center justify-between px-5 py-3 bg-blue-50 dark:bg-zinc-800 rounded-xl shadow-md w-full transition hover:scale-105 hover:bg-blue-100 dark:hover:bg-zinc-700">
            <span className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
              <CiBookmarkCheck className="size-6" /> Saved Jobs
            </span>
            <FaArrowRight className="size-4 text-blue-600 dark:text-blue-400" />
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
