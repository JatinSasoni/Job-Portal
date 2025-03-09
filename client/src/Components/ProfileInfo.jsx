/* eslint-disable react/prop-types */
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineMarkEmailRead, MdNumbers } from "react-icons/md";
import { useSelector } from "react-redux";
import { motion } from "motion/react";

export const ProfileInfo = ({ setIsUpdateProfile }) => {
  const { loggedInUser } = useSelector((state) => state.auth);

  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        type: "tween",
      }}
      className="p-6 rounded-2xl shadow-lg bg-white dark:bg-zinc-900 dark:text-white"
    >
      {/* Profile Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="size-20 rounded-full overflow-hidden border-2 border-blue-500">
            <img
              src={loggedInUser?.profile?.profilePhoto}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-semibold">{loggedInUser?.username}</h1>
        </div>
        <FaRegEdit
          className="size-8 cursor-pointer text-blue-500 hover:text-blue-400 transition-all"
          onClick={() => setIsUpdateProfile(true)}
        />
      </div>

      {/* Bio Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Bio</h3>
        <p>{loggedInUser?.profile?.bio || "NA"}</p>
      </div>

      {/* Contact Info */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
        <div className="flex items-center gap-3 mb-2">
          <MdOutlineMarkEmailRead className="size-6 text-blue-500" />
          <span>{loggedInUser?.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <MdNumbers className="size-6 text-blue-500" />
          <span>{loggedInUser?.phoneNumber || "NA"}</span>
        </div>
      </div>

      {/* Skills */}
      {loggedInUser?.role === "student" && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-3">
            {loggedInUser?.profile?.skills?.length > 0 ? (
              loggedInUser?.profile?.skills?.map((skill, ind) => (
                <span
                  key={ind}
                  className="bg-blue-500 text-white py-1 px-3 rounded-lg shadow-md dark:bg-zinc-700"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p>NA</p>
            )}
          </div>
        </div>
      )}

      {/* Resume */}
      {loggedInUser?.role === "student" && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Resume</h3>
          {loggedInUser?.profile?.resume ? (
            <a
              href={loggedInUser?.profile?.resume}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {loggedInUser?.profile?.resumeOriginalName}
            </a>
          ) : (
            <p className="text-red-500">*Upload your resume</p>
          )}
        </div>
      )}
    </motion.section>
  );
};
