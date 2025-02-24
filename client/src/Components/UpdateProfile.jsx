// import { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { handleUpdateAPICall } from "../../Api/postAPI";
import { setLoading, setLoggedInUser } from "../../store/authSlice";
import { toast } from "react-toastify";
import { motion } from "motion/react";
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
  const { register, handleSubmit } = useForm({
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
  //SELECTOR FOR LOADING STATE
  const { loading } = useSelector((state) => state.auth);

  //HANDLING UPDATE PROFILE
  const onSubmit = async (data) => {
    try {
      //LOADING STATE TO TRUE
      dispatch(setLoading(true));

      //FORM DATA
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.number);
      formData.append("bio", data.bio);
      formData.append("skills", data.skills);
      if (data.resume) {
        formData.append("file", data.resume[0]);
      }
      if (data.profilePhoto) {
        formData.append("profilePhoto", data.profilePhoto[0]);
      }

      const response = await handleUpdateAPICall(formData);

      if (response.status === 200) {
        //UPDATE USER ON STORE
        dispatch(setLoggedInUser(response.data.user));
        //SUCCESS TOAST
        toast.success(response.data.MESSAGE);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.MESSAGE);
    } finally {
      //SET LOADING STATE TO FALSE
      dispatch(setLoading(false));
    }

    setIsUpdateProfile(false);
  };

  return (
    <section>
      <div className="backdrop-blur-sm fixed left-0 right-0 bottom-0 top-0 grid place-items-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "tween",
          }}
          className="bg-white fixed px-8 py-4 rounded-xl border w-1/3 shadow-2xl dark:bg-gray-900 dark:shadow-md dark:shadow-white"
        >
          {/* HEADER */}
          <div className="text-3xl font-bold mb-2 text-[#1e0e4b] flex justify-between dark:text-white">
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
            encType="multipart/form-data"
            className="flex flex-col gap-3 dark:[&>div>label]:text-white"
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
                htmlFor="profilePhoto"
                className="my-auto text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
              >
                ProfilePhoto
              </label>
              <input
                type="file"
                {...register("profilePhoto")}
                accept="image/*"
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block  m-0 p-[8px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0 dark:text-white"
              />
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
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block  m-0 p-[8px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0 dark:text-white"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
            >
              {/* IF LOADING IS TRUE THEN SHOW LOADER ELSE SUBMIT BUTTON */}
              {loading ? <div className="loader"></div> : "Submit"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
