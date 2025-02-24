/* eslint-disable react/prop-types */
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { MdNumbers } from "react-icons/md";
import { useSelector } from "react-redux";

export const ProfileInfo = ({ setIsUpdateProfile }) => {
  const { loggedInUser } = useSelector((state) => state.auth);

  return (
    <section className="flex flex-col gap-3 border p-3 dark:text-white rounded-xl dark:shadow-md dark:shadow-white">
      {/* CONTAINER FOR PROFILE HEADER */}
      <div className=" flex justify-around">
        {/* PROFILE IMAGE AND NAME */}
        <div className="flex gap-4">
          <div className="size-16 rounded-full cursor-pointer  bg-blue-400 overflow-hidden border">
            <img
              src={loggedInUser?.profile?.profilePhoto}
              alt="pfp"
              className="size-full"
            />
          </div>

          <div className="grid place-items-center">
            <h1 className="text-3xl">{loggedInUser?.username}</h1>
          </div>
        </div>

        {/* EDIT PROFILE */}
        <div className="grid place-items-center">
          <FaRegEdit
            className="size-10 cursor-pointer"
            onClick={() => setIsUpdateProfile(true)}
          />
        </div>
      </div>

      {/* BIO */}
      <div className="p-2">
        <div className="flex gap-2">
          <h3 className="text-2xl">Bio : </h3>
          <p className="my-auto">{loggedInUser?.profile.bio}</p>
        </div>
      </div>

      {/* EMAIL AND NUMBER */}
      <div className=" p-2">
        <div className=" flex gap-3">
          <MdOutlineMarkEmailRead className="my-auto size-6" />
          <span className="text-xl">{loggedInUser?.email}</span>
        </div>
        <div className=" flex gap-3 ">
          <MdNumbers className="my-auto size-6" />
          <span className="text-xl">{loggedInUser?.phoneNumber}</span>
        </div>
      </div>

      {/* SKILLS */}
      <div>
        <h3 className="text-xl">Skills : </h3>
        <div className="flex gap-3">
          {loggedInUser?.profile?.skills?.length === 0
            ? "NA"
            : loggedInUser?.profile?.skills?.map((skill, ind) => {
                return (
                  <p
                    key={ind}
                    className="inline-block py-1 px-3 bg-black text-white rounded-md"
                  >
                    {skill}
                  </p>
                );
              })}
          {}
        </div>
      </div>

      {/* RESUME */}
      <div>
        <h3 className="text-xl">Resume :</h3>
        <div>
          {loggedInUser?.profile?.resume ? (
            <a href={loggedInUser?.profile?.resume} className="text-blue-300">
              {loggedInUser?.profile?.resumeOriginalName}
            </a>
          ) : (
            <p className="text-red-500">*Upload your resume</p>
          )}
        </div>
      </div>
    </section>
  );
};
