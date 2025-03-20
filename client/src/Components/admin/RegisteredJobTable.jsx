import { NavLink, useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { motion } from "motion/react";
import { toast } from "react-toastify";
import { deleteJobAPI } from "../../../Api/deleteAPI";
import { useState } from "react";

/* eslint-disable react/prop-types */
export const RegisteredJobTable = ({ allAdminJobs }) => {
  const navigate = useNavigate();
  const [loadingID, setLoadingID] = useState(null);

  //HANDLE DELETE JOB
  const handleJobDelete = async (jobID) => {
    try {
      setLoadingID(jobID);
      const response = await deleteJobAPI(jobID);
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
    <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400 rounded mb-6 shadow-md">
      {/* TABLE HEAD */}
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-zinc-800 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Company
          </th>
          <th scope="col" className="px-6 py-3">
            Role
          </th>
          <th scope="col" className="px-6 py-3">
            Job Type
          </th>
          <th scope="col" className="px-6 py-3">
            Date
          </th>
          <th scope="col" className="px-6 py-3">
            Edit Post
          </th>
          <th scope="col" className="px-6 py-3">
            Applicants
          </th>
          <th scope="col" className="px-6 py-3 ">
            Remove Job/Post
          </th>
        </tr>
      </thead>
      {/* TABLE BODY */}
      <tbody>
        {allAdminJobs?.map((job, indx) => {
          return (
            <tr
              key={indx}
              className="odd:bg-white odd:dark:bg-zinc-900 even:bg-gray-50 even:dark:bg-zinc-800 border-b dark:border-gray-700 border-gray-200"
            >
              <td className="px-6 py-4">{job?.CompanyID?.companyName}</td>
              <td className="px-6 py-4">{job?.title}</td>
              <td className="px-6 py-4">{job?.jobType}</td>
              <td className="px-6 py-4">{job?.createdAt?.split("T")[0]}</td>
              <td className="px-6 py-4">
                <NavLink to={`/admin/job-post/${job?._id}/edit`}>
                  <button className="p-2 text-white rounded-xl px-4 ">
                    <FaUserEdit className="text-black size-6 hover:scale-125 transition-all dark:text-gray-100" />
                  </button>
                </NavLink>
              </td>

              <td className="px-6 py-4 ">
                {/* api/v1/application/67b1b795b77e1e0e315b168a/applicants */}
                <NavLink to={`/admin/job/${job?._id}/applicants`}>
                  <button className="p-2 text-white rounded-xl px-4 ">
                    <FaUsers className="text-black size-6 hover:scale-125 transition-all dark:text-gray-100" />
                  </button>
                </NavLink>
              </td>
              <td className="px-6 py-4 ">
                {/* api/v1/job/job-post/:jobID/edit */}

                <button
                  className="p-2 text-white rounded-xl px-4"
                  onClick={() => handleJobDelete(job?._id)}
                  disabled={loadingID === job?._id}
                >
                  {loadingID === job?._id ? (
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
