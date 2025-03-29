import { Navbar } from "../Shared/Navbar";
import { useGetAllApplicants } from "../../Hooks/getAllApplicants";
import { useDispatch, useSelector } from "react-redux";
import { handleStatusUpdateAPI } from "../../../Api/postAPI";
import { useNavigate, useParams } from "react-router-dom";
import { setLoading } from "../../../store/authSlice";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { JobNotFound } from "../JobNotFound";

export const AdminApplicants = () => {
  const { jobID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allApplicants } = useSelector((store) => store.application);
  const { loading } = useSelector((store) => store.auth);
  const [loadingId, setLoadingId] = useState(null);
  const [localApplicants, setLocalApplicants] = useState([]);

  useGetAllApplicants(jobID);

  // Sync local state with Redux state to prevent unnecessary re-renders
  useEffect(() => {
    setLocalApplicants(allApplicants);
  }, [allApplicants]);

  const handleAcceptRejectApplicant = async (status, applicationID) => {
    try {
      setLoadingId(applicationID);
      dispatch(setLoading(true));
      const response = await handleStatusUpdateAPI({ status }, applicationID);
      if (response.data.SUCCESS) {
        // Update only the changed applicant locally instead of refreshing
        setLocalApplicants((prev) =>
          prev.map((app) =>
            app._id === applicationID ? { ...app, status } : app
          )
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId(null);
      dispatch(setLoading(false));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 lg:h-[calc(100vh-112px)]">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="relative my-8 mx-auto max-w-6xl px-4 z-0">
        {!localApplicants.length ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "tween", duration: 1 }}
              className="text-5xl font-semibold mb-2 text-zinc-700 text-center dark:text-white tracking-tight"
            >
              Currently no
              <span className="text-blue-400 font-bold"> "Application" </span>
            </motion.div>
            <div className="h-96 w-full">
              <JobNotFound />
            </div>
          </>
        ) : (
          <>
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "tween", duration: 1 }}
              className="mb-6 text-3xl lg:text-4xl font-bold text-center dark:text-slate-100 text-gray-800"
            >
              Total Applicants - {localApplicants.length}
            </motion.h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {localApplicants.map((application) => (
                <div
                  key={application._id}
                  className="bg-white dark:bg-zinc-800 p-5 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300 dark:border-zinc-600">
                      <img
                        src={application?.applicant?.profile?.profilePhoto}
                        alt="PFP"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-lg md:text-sm lg:text-lg font-semibold dark:text-white">
                        {application?.applicant?.username}
                      </h2>
                      <p className="text-gray-500 text-[10px] dark:text-gray-300 lg:text-sm">
                        {application?.applicant?.email}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                    <p>📞 {application?.applicant?.phoneNumber}</p>
                    <p>
                      📅 Applied on:{" "}
                      {new Date(application.createdAt).toLocaleDateString()}
                    </p>
                    <a
                      href={application?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-blue-500 dark:text-blue-400 hover:underline"
                    >
                      📄 View Resume
                    </a>
                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        `/admin/applicant/${application?.applicant?._id}/profile`
                      )
                    }
                    className="mt-3 w-full px-3 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition"
                  >
                    View Profile
                  </button>

                  <div className="mt-3 flex justify-between items-center gap-2">
                    {application?.status === "pending" ? (
                      loadingId === application?._id ? (
                        <div className="animate-spin h-5 w-5 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                      ) : (
                        <>
                          <button
                            onClick={() =>
                              handleAcceptRejectApplicant(
                                "accepted",
                                application?._id
                              )
                            }
                            className="px-3 py-2 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition w-1/2"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleAcceptRejectApplicant(
                                "rejected",
                                application?._id
                              )
                            }
                            className="px-3 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition w-1/2"
                          >
                            Reject
                          </button>
                        </>
                      )
                    ) : (
                      <span
                        className={`px-3 py-2 text-white text-sm rounded-md ${
                          application?.status === "accepted"
                            ? "bg-green-500"
                            : "bg-red-500"
                        } w-full text-center`}
                      >
                        {application?.status.charAt(0).toUpperCase() +
                          application?.status.slice(1)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};
