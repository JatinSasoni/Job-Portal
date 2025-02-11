// import { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { handleUpdateAPICall } from "../../Api/postAPI";
import { setLoggedInUser } from "../../store/authSlice";
import { toast } from "react-toastify";
/* eslint-disable react/prop-types */
export const UpdateProfile = ({ setIsUpdateProfile }) => {
  //LOGIC FOR DISABLING BACKGROUND SCROLL BEHAVIOR WHILE MODAL/DIALOGUE BOX
  // useEffect(() => {
  //   document.body.style.overflowY = "hidden";
  //   return () => {
  //     document.body.style.overflowY = "scroll";
  //   };
  // }, []);

  // LOGGED IN USER INFO
  const { loggedInUser } = useSelector((state) => state.auth);

  //USE FORM HOOK
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      username: loggedInUser?.username,
      email: loggedInUser?.email,
      number: loggedInUser?.phoneNumber,
      bio: loggedInUser?.profile?.bio,
      skills: loggedInUser?.profile?.skills?.map((skill) => skill),
      resume: loggedInUser?.resume,
    },
  });

  //DISPATCH
  const dispatch = useDispatch();

  //HANDLING UPDATE PROFILE
  const onSubmit = async (data) => {
    try {
      const response = await handleUpdateAPICall(data);
      console.log(response);
      if (response.status === 200) {
        //UPDATE USER ON STORE
        dispatch(setLoggedInUser(response.data.user));
        //SUCCESS TOAST
        toast.success(response.data.MESSAGE);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.MESSAGE);
    }
    setIsUpdateProfile(false);
  };

  return (
    <section>
      <div className="backdrop-blur-sm fixed left-0 right-0 bottom-0 top-0 grid place-items-center">
        <div className="bg-white fixed px-8 py-4 rounded-md border  ">
          {/* HEADER */}
          <div className="text-3xl font-bold mb-2 text-[#1e0e4b] flex justify-between">
            <div>
              Update <span className="text-[#7747ff]">Profile</span>
            </div>
            <button
              className="button-34"
              onClick={() => setIsUpdateProfile(false)}
            >
              <IoCloseSharp />
            </button>
          </div>

          {/* UPDATE FORM */}
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* NAME */}
            <div>
              <label
                htmlFor="username"
                className="my-auto text-gray-600 cursor-text text-sm leading-[140%] font-normal"
              >
                Name
              </label>
              <input
                type="text"
                {...register("username")}
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block  m-0 p-[8px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
              />
            </div>
            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="my-auto text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
              >
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block  m-0 p-[8px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
              />
            </div>
            {/* NUMBER */}
            <div>
              <label
                htmlFor="number"
                className="my-auto text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
              >
                Number
              </label>
              <input
                type="number"
                {...register("number")}
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block  m-0 p-[8px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
              />
            </div>

            {/* BIO */}
            <div>
              <label
                htmlFor="bio"
                className="my-auto text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
              >
                Bio
              </label>
              <input
                type="text"
                {...register("bio")}
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block  m-0 p-[8px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
              />
            </div>
            {/* SKILLS */}
            <div>
              <label
                htmlFor="skills"
                className="my-auto text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
              >
                Skills
              </label>
              <input
                type="text"
                {...register("skills")}
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block  m-0 p-[8px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
              />
            </div>
            {/* RESUME */}
            <div>
              <label
                htmlFor="resume"
                className="my-auto text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
              >
                Resume
              </label>
              <input
                type="file"
                {...register("resume")}
                accept="application/pdf,application/vnd.ms-excel"
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block  m-0 p-[8px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
              />
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
