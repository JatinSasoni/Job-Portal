import { Navbar } from "../Shared/Navbar";
import { useGetAllApplicants } from "../../Hooks/getAllApplicants";
import { useSelector } from "react-redux";
import { handleStatusUpdateAPI } from "../../../Api/postAPI";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const AdminApplicantsTable = () => {
  const { jobID } = useParams();
  useGetAllApplicants(jobID);
  const navigate = useNavigate();
  const { allApplicants } = useSelector((store) => store.application);

  const handleUpdateStatus = async (status, applicationID) => {
    try {
      const response = await handleStatusUpdateAPI({ status }, applicationID);
      if (response.data.SUCCESS) {
        toast.success(response.data.MESSAGE);
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative overflow-x-auto my-8 mx-auto max-w-7xl z-0">
        <h1 className="my-2 text-3xl mx-a">
          Applicants {allApplicants?.length}
        </h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone no.
              </th>
              <th scope="col" className="px-6 py-3">
                Resume
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {allApplicants?.map((application, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {application?.applicant?.username}
                  </td>

                  <td className="px-6 py-4">{application?.applicant?.email}</td>
                  <td className="px-6 py-4">
                    {application?.applicant?.phoneNumber}
                  </td>
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
                  <td className="px-6 py-4">
                    {application?.status === "pending" ? (
                      <div>
                        <button
                          onClick={() =>
                            handleUpdateStatus("accepted", application?._id)
                          }
                          className="bg-green-500 px-5 py-2 text-white rounded-full hover:scale-105"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() =>
                            handleUpdateStatus("rejected", application?._id)
                          }
                          className=" bg-red-500 px-5 py-2 text-white rounded-full hover:scale-105"
                        >
                          Reject
                        </button>
                      </div>
                    ) : application?.status === "accepted" ? (
                      "Accepted"
                    ) : (
                      "Rejected"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
