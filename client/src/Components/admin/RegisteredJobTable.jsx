import { NavLink } from "react-router-dom";

/* eslint-disable react/prop-types */
export const RegisteredJobTable = ({ allAdminJobs }) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
            Role
          </th>
          <th scope="col" className="px-6 py-3">
            Job Type
          </th>
          <th scope="col" className="px-6 py-3">
            Date
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
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <div className="rounded-full size-10 border overflow-hidden">
                  <img
                    src={job?.CompanyID?.logo}
                    alt="logo"
                    width="60"
                    height="20"
                    className="size-full"
                  />
                </div>
              </td>
              <td className="px-6 py-4">{job?.CompanyID?.companyName}</td>
              <td className="px-6 py-4">{job?.title}</td>
              <td className="px-6 py-4">{job?.jobType}</td>
              <td className="px-6 py-4">{job?.createdAt?.split("T")[0]}</td>
              {/* <td className="px-6 py-4">
                <NavLink to={`/admin/job/update/${job?._id}`}>
                  <button className="p-2 bg-blue-500 text-white rounded-xl px-4">
                    Edit
                  </button>
                </NavLink>
              </td>
              <td className="px-6 py-4">
                <button className="p-2 bg-blue-800 text-white rounded-xl px-4">
                  Delete
                </button>
              </td> */}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
