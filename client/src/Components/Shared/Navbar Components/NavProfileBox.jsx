import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaArrowRight } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";
import { motion } from "motion/react";

/* eslint-disable react/prop-types */
export const NavProfileBox = ({
  loggedInUser,
  handleLogoutUser,
  setProfileClicked,
}) => {
  return (
    <motion.div
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="w-72 bg-white rounded-md absolute right-8 p-4 flex flex-col gap-2"
    >
      <div className="flex gap-3">
        <div className="size-9 rounded-full cursor-pointer  bg-blue-400 overflow-hidden">
          <img
            src={loggedInUser?.profile?.profilePhoto}
            alt="pfp"
            className="size-full"
          />
        </div>

        <div>
          <h2 className="mt-1 flex flex-col">~{loggedInUser?.username}</h2>
          <p className="text-gray-400 text-sm">@{loggedInUser?.email}</p>
        </div>
      </div>

      <p className="text-gray-400">{loggedInUser?.profile?.bio}</p>

      <NavLink
        to="/profile"
        className="hover:scale-105 transition-all"
        onClick={() => setProfileClicked(false)}
      >
        <button className="flex justify-between px-2 w-full bg-slate-200 p-1 outline-none  rounded-xl ">
          <p className="text-lg flex gap-2">
            <CgProfile className="my-auto size-6 " />
            Profile
          </p>
          <FaArrowRight className="my-auto size-4 " />
        </button>
      </NavLink>

      <div>
        <button
          className="hover:scale-105 transition-all flex justify-between px-2 w-full bg-slate-200 p-1 outline-none  rounded-xl "
          onClick={handleLogoutUser}
        >
          <p className="text-lg flex gap-2">
            <TbLogout2 className="my-auto size-6 " />
            Logout
          </p>
          <FaArrowRight className="my-auto size-4 " />
        </button>
      </div>
    </motion.div>
  );
};
