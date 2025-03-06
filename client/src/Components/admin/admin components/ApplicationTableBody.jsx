/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { motion } from "motion/react";

export const ApplicationTableBody = ({ handleUpdateStatus, allApplicants }) => {
  const { loading } = useSelector((store) => store.auth);

  return (
    <tbody>
      {allApplicants?.map((application, index) => {
        return (
          <motion.tr
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 1 }}
            key={indx}
            key={index}
            className="odd:bg-white odd:dark:bg-zinc-900 even:bg-gray-50 even:dark:bg-zinc-800 border-b dark:border-gray-700 border-gray-200"
          >
            <td
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {application?.applicant?.username}
            </td>

            <td className="px-6 py-4">{application?.applicant?.email}</td>
            <td className="px-6 py-4">{application?.applicant?.phoneNumber}</td>
            <td className="px-6 py-4">
              {application?.applicant?.profile?.resume ? (
                <a
                  href={application?.applicant?.profile?.resume}
                  className="text-purple-500"
                >
                  {application?.applicant?.profile?.resumeOriginalName}
                </a>
              ) : (
                <span>NA</span>
              )}
            </td>
            <td className="px-6 py-4">
              {application?.applicant?.createdAt?.split("T")[0]}
            </td>
            <td
              className={`px-6 py-4 ${
                application?.status === "accepted"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {application?.status === "pending" ? (
                <div>
                  {/* IF LOADING IS TRUE THEN SHOW LOADER ELSE BUTTONS */}
                  {loading ? (
                    <div className="animate-bounce ">...</div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleUpdateStatus("accepted", application?._id)
                        }
                        className="bg-green-500 px-3 py-2 text-white rounded-full hover:scale-105"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateStatus("rejected", application?._id)
                        }
                        className=" bg-red-500 px-3 py-2 text-white rounded-full hover:scale-105"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ) : application?.status === "accepted" ? (
                "Accepted"
              ) : (
                "Rejected"
              )}
            </td>
          </motion.tr>
        );
      })}
    </tbody>
  );
};
