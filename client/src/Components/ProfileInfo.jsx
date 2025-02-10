/* eslint-disable react/prop-types */
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { MdNumbers } from "react-icons/md";

const dummySkills = ["html", "css", "javascript", "react"];

export const ProfileInfo = ({ setIsUpdateProfile }) => {
  return (
    <section className="flex flex-col gap-3 border p-3">
      {/* CONTAINER FOR PROFILE HEADER */}
      <div className=" flex justify-around">
        {/* PROFILE IMAGE AND NAME */}
        <div className="flex gap-4">
          <div className="size-16 rounded-full cursor-pointer  bg-blue-400 overflow-hidden">
            <img src="/Logo/pfp.jpg" alt="pfp" className="size-full" />
          </div>

          <div className="grid place-items-center">
            <h1 className="text-3xl">Jatin Sasoni</h1>
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
          <p className="my-auto">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates
            aperiam delectus numquam.
          </p>
        </div>
      </div>

      {/* EMAIL AND NUMBER */}
      <div className=" p-2">
        <div className=" flex gap-3">
          <MdOutlineMarkEmailRead className="my-auto size-6" />
          <span className="text-xl">jatin@gmail.com</span>
        </div>
        <div className=" flex gap-3 ">
          <MdNumbers className="my-auto size-6" />
          <span className="text-xl">6284288651</span>
        </div>
      </div>

      {/* SKILLS */}
      <div>
        <h3 className="text-xl">Skills : </h3>
        <div className="flex gap-3">
          {dummySkills.length === 0
            ? "NA"
            : dummySkills.map((skill, ind) => {
                return (
                  <p
                    key={ind}
                    className="inline-block py-1 px-3 bg-black text-white rounded-md"
                  >
                    skill
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
          <a href="/profile" className="text-blue-300">
            Resume link
          </a>
        </div>
      </div>
    </section>
  );
};
