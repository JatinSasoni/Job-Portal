import { NavLink, useNavigate } from "react-router-dom";
import { deleteCompanyAPI } from "../../../Api/deleteAPI";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

import { useState } from "react";

/* eslint-disable react/prop-types */
export const RegisteredComTable = ({ allCompanies }) => {
  const navigate = useNavigate();
  const [loadingID, setLoadingID] = useState(null);

  const handleCompanyDelete = async (companyID) => {
    try {
      setLoadingID(companyID);
      const response = await deleteCompanyAPI(companyID);
      if (response.data.SUCCESS) {
        navigate(0);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingID(null);
    }
  };

  return (
    <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
      {/* TABLE HEAD */}
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-zinc-800 dark:text-gray-400">
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
            <tr
              key={indx}
              className="odd:bg-white odd:dark:bg-zinc-900 even:bg-gray-50 even:dark:bg-zinc-800 border-b dark:border-gray-700 border-gray-200"
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
              <td className="px-6 py-4">
                {company?.website !== "NA" ? (
                  <a href={company?.website} target="_blank">
                    {company?.website}
                  </a>
                ) : (
                  company?.website
                )}
              </td>
              <td className="px-6 py-4">{company?.createdAt?.split("T")[0]}</td>
              <td className="px-6 py-4">
                <NavLink to={`/admin/company/update/${company?._id}`}>
                  <button className="p-2 text-white rounded-xl px-4 ">
                    <FaUserEdit className="text-black size-6 hover:scale-125 transition-all dark:text-gray-100" />
                  </button>
                </NavLink>
              </td>
              <td className="px-6 py-4">
                <button
                  className="p-2 dark:text-white rounded-xl px-4"
                  onClick={() => handleCompanyDelete(company?._id)}
                  disabled={loadingID === company?._id}
                >
                  {loadingID === company?._id ? (
                    <p className="animate-bounce">...</p>
                  ) : (
                    <MdDeleteSweep className="text-black size-6 hover:scale-125 transition-all dark:text-gray-100" />
                  )}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
