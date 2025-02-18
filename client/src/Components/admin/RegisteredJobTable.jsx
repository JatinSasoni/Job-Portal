import { NavLink } from "react-router-dom";

/* eslint-disable react/prop-types */
export const RegisteredJobTable = ({ allAdminJobs }) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      {/* TABLE HEAD */}
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
            Applicants
          </th>
        </tr>
      </thead>
      {/* TABLE BODY */}
      <tbody>
        {allAdminJobs?.map((job, indx) => {
          return (
            <tr
              key={indx}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            >
              <td className="px-6 py-4">{job?.CompanyID?.companyName}</td>
              <td className="px-6 py-4">{job?.title}</td>
              <td className="px-6 py-4">{job?.jobType}</td>
              <td className="px-6 py-4">{job?.createdAt?.split("T")[0]}</td>
              <td className="px-6 py-4">
                <NavLink to={`/admin/job/${job?._id}/applicants`}>
                  {/* api/v1/application/67b1b795b77e1e0e315b168a/applicants */}
                  <button className="p-2 bg-blue-500 text-white rounded-xl px-4">
                    View
                  </button>
                </NavLink>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
