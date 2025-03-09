import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../Shared/Navbar";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { MdOutlineMail, MdPhone, MdWork, MdDescription } from "react-icons/md";
import { handleGetApplicantProfile } from "../../../Api/getAPI";

export const ViewApplicant = () => {
  const { applicantID } = useParams(); // Get user ID from URL
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicant = async (applicantID) => {
      try {
        const response = await handleGetApplicantProfile(applicantID);
        if (response.data.SUCCESS) {
          setApplicant(response.data.user);
        }
      } catch (error) {
        toast.error("User not found");
      } finally {
        setLoading(false);
      }
    };
    fetchApplicant(applicantID);
  }, [applicantID]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!applicant) {
    return (
      <div className="text-center mt-10 text-red-500 font-semibold">
        User not found.
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6">
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "tween" }}
          className="bg-white dark:bg-zinc-900 dark:text-white rounded-2xl shadow-xl py-4 px-8 mb-4"
        >
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center mb-3">
            <div className="size-28 rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 p-1">
              <img
                src={applicant?.profile?.profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h1 className="text-3xl font-semibold mt-3">
              {applicant?.username}
            </h1>
            <p className="text-gray-500 dark:text-gray-300">
              {applicant?.role?.toUpperCase()}
            </p>
          </div>

          {/* Contact Information */}
          <div className="border-t border-gray-300 dark:border-zinc-700 pt-3">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <MdOutlineMail className="size-6 text-blue-500" />
                <span>{applicant?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <MdPhone className="size-6 text-blue-500" />
                <span>{applicant?.phoneNumber || "Not Provided"}</span>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="border-t border-gray-300 dark:border-zinc-700 pt-6 mt-6">
            <h3 className="text-xl font-semibold mb-2">About Me</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {applicant?.profile?.bio || "No bio available."}
            </p>
          </div>

          {/* Skills */}
          {applicant?.role === "student" && (
            <div className="border-t border-gray-300 dark:border-zinc-700 pt-6 mt-6">
              <h3 className="text-xl font-semibold mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {applicant?.profile?.skills?.length > 0 ? (
                  applicant?.profile?.skills.map((skill, ind) => (
                    <span
                      key={ind}
                      className="bg-blue-500 text-white py-1 px-3 rounded-lg shadow-md dark:bg-zinc-700"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No skills listed.</p>
                )}
              </div>
            </div>
          )}

          {/* Resume */}
          {applicant?.role === "student" && (
            <div className="border-t border-gray-300 dark:border-zinc-700 pt-6 mt-6">
              <h3 className="text-xl font-semibold mb-2">Resume</h3>
              {applicant?.profile?.resume ? (
                <a
                  href={applicant?.profile?.resume}
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </a>
              ) : (
                <p className="text-gray-500">No resume uploaded.</p>
              )}
            </div>
          )}
        </motion.section>
      </div>
    </>
  );
};
