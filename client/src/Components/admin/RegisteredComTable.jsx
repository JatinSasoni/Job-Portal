import { NavLink } from "react-router-dom";
import { motion } from "motion/react";

/* eslint-disable react/prop-types */
export const RegisteredComTable = ({ allCompanies }) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 drop-shadow-xl">
      {/* TABLE HEAD */}
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Logo
          </th>
          <th scope="col" className="px-6 py-3">
            Company name
          </th>
          <th scope="col" className="px-6 py-3">
            Location
          </th>
          <th scope="col" className="px-6 py-3">
            Website
          </th>
          <th scope="col" className="px-6 py-3">
            Date
          </th>
          <th scope="col" className="px-6 py-3">
            Update
          </th>
          <th scope="col" className="px-6 py-3">
            Delete
          </th>
        </tr>
      </thead>
      {/* TABLE BODY */}
      <tbody>
        {allCompanies?.map((company, indx) => {
          return (
            <motion.tr
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", duration: 1 }}
              key={indx}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            >
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <div className="rounded-full size-10 border overflow-hidden">
                  <img
                    src={company?.logo}
                    alt="logo"
                    width="60"
                    height="20"
                    className="size-full"
                  />
                </div>
              </td>
              <td className="px-6 py-4">{company?.companyName}</td>
              <td className="px-6 py-4">{company?.location}</td>
              <td className="px-6 py-4">{company?.website}</td>
              <td className="px-6 py-4">{company?.createdAt?.split("T")[0]}</td>
              <td className="px-6 py-4">
                <NavLink to={`/admin/company/update/${company?._id}`}>
                  <button className="p-2 bg-blue-500 text-white rounded-xl px-4">
                    Edit
                  </button>
                </NavLink>
              </td>
              <td className="px-6 py-4">
                <button className="p-2 bg-blue-800 text-white rounded-xl px-4">
                  Delete
                </button>
              </td>
            </motion.tr>
          );
        })}
      </tbody>
    </table>
  );
};
