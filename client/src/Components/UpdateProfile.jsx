// import { useEffect } from "react";

/* eslint-disable react/prop-types */
export const UpdateProfile = ({ setIsUpdateProfile }) => {
  //LOGIC FOR DISABLING BACKGROUND SCROLL BEHAVIOR WHILE MODAL/DIALOGUE BOX
  // useEffect(() => {
  //   document.body.style.overflowY = "hidden";
  //   return () => {
  //     document.body.style.overflowY = "scroll";
  //   };
  // }, []);

  return (
    <section>
      <div className="backdrop-blur-sm fixed left-0 right-0 bottom-0 top-0 grid place-items-center">
        <div className="bg-white fixed p-4 border  ">
          {/* HEADER */}
          <div className="text-4xl font-bold mb-2 text-[#1e0e4b] flex justify-between">
            <div>
              Edit <span className="text-[#7747ff]">Profile</span>
            </div>
            <button
              className="button-34"
              onClick={() => setIsUpdateProfile(false)}
            >
              Back
            </button>
          </div>

          {/* UPDATE FORM */}
          <form className="flex flex-col gap-3">
            {/* EMAIL */}
            <div className="block relative">
              <label
                htmlFor="email"
                className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
              >
                Email
              </label>
              <input
                type="email"
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
              />
            </div>

            {/* PASSWORD */}
            <div className="block relative">
              <label
                htmlFor="password"
                className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
              >
                Password
              </label>
              <input
                type="text"
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
              />
            </div>

            {/* FORGET PASSWORD */}
            <div>
              <a className="text-sm text-[#7747ff]" href="#">
                Forgot your password?
              </a>
            </div>

            {/* ROLE */}
            <div className="relative flex justify-evenly">
              <div>
                <input type="text" />
                <label htmlFor="student">Student</label>
              </div>
              <div>
                <input type="text" />
                <label htmlFor="">Recruiter</label>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
            >
              {/* IF LOADING IS TRUE THEN SHOW LOADER ELSE SUBMIT BUTTON */}
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
