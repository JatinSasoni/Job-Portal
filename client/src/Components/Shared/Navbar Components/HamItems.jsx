/* eslint-disable react/prop-types */
import { motion } from "motion/react";
import { NavLink } from "react-router-dom";

const HamItems = ({ loggedInUser }) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="lg:hidden absolute z-10 w-full backdrop-blur rounded-md dark:bg-zinc-900 text-center space-y-4 shadow-md  dark:shadow-inner dark:border-b"
    >
      {loggedInUser?.role === "recruiter" ? (
        <>
          <NavLink
            to="/admin/companies"
            className="block py-2 hover:text-blue-500 dark:text-white"
          >
            Companies
          </NavLink>
          <NavLink
            to="/admin/jobs"
            className="block py-2 hover:text-blue-500 dark:text-white"
          >
            Jobs
          </NavLink>
          <NavLink
            to="/contact"
            className="block py-2 hover:text-blue-500 dark:text-white"
          >
            Contact Us
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to="/"
            className="block py-2 hover:text-blue-500 dark:text-white"
          >
            Home
          </NavLink>
          <NavLink
            to="/contact"
            className="block py-2 hover:text-blue-500 dark:text-white"
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/jobs"
            className="block py-2 hover:text-blue-500 dark:text-white"
          >
            Jobs
          </NavLink>
          <NavLink
            to="/browse"
            className="block py-2 hover:text-blue-500 dark:text-white"
          >
            Browse
          </NavLink>
        </>
      )}
    </motion.div>
  );
};

export default HamItems;
