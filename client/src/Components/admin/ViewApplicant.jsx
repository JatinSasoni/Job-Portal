import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Navbar } from "../Shared/Navbar";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { MdOutlineMail, MdPhone } from "react-icons/md";
import { handleGetApplicantProfile } from "../../../Api/getAPI";
import { FaRegFilePdf } from "react-icons/fa6";
import AdminButton from "./admin components/AdminButton";

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
        toast.error(error.response.data.MESSAGE);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicant(applicantID);
  }, [applicantID]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center max-sm:h-[calc(100vh-72px)]  sm:h-[calc(100vh-112px)]">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      </>
    );
  }

  if (!applicant) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-10 text-5xl text-red-500 font-semibold">
          User not found.
        </div>
        <div className=" grid place-items-center my-3">
          <NavLink to="/admin/jobs">
            <AdminButton label="Go Back" />
          </NavLink>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "tween" }}
        className="max-w-2xl max-md:px-2 max-lg:mt-8  mx-auto bg-white dark:bg-zinc-900 dark:text-white shadow-lg rounded-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 dark:from-zinc-800 dark:to-zinc-700">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full border-4 border-white/50 overflow-hidden shadow-lg">
              <img
                src={applicant?.profile?.profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{applicant?.username}</h1>
              <p className="text-lg opacity-90">
                {applicant?.role?.toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6 space-y-6">
          {/* Bio */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              About Me
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {applicant?.profile?.bio || "No bio available"}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Contact Information
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <MdOutlineMail className="text-blue-500 text-xl" />
                <span>{applicant?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <MdPhone className="text-blue-500 text-xl" />
                <span>{applicant?.phoneNumber || "Not provided"}</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          {applicant?.role === "student" && (
            <div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Skills
              </h3>
              {applicant?.profile?.skills?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {applicant.profile.skills.map((skill, ind) => (
                    <motion.span
                      key={ind}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: ind * 0.1 }}
                      className="bg-blue-500 text-white text-sm font-medium py-1 px-3 rounded-full shadow-sm dark:bg-zinc-800"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No skills added</p>
              )}
            </div>
          )}

          {/* Resume */}
          {applicant?.role === "student" && (
            <div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Resume
              </h3>
              {applicant?.profile?.resume ? (
                <motion.a
                  href={applicant.profile.resume}
                  className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaRegFilePdf className="text-xl" />
                  <span>
                    {applicant.profile.resumeOriginalName || "View Resume"}
                  </span>
                </motion.a>
              ) : (
                <p className="text-red-500">Not uploaded</p>
              )}
            </div>
          )}
        </div>
      </motion.section>
    </>
  );
};
