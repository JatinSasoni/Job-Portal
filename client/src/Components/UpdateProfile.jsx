// import { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { handleUpdateAPICall } from "../../Api/postAPI";
import { setLoading, setLoggedInUser } from "../../store/authSlice";
import { toast } from "react-toastify";
import { motion } from "motion/react";
// import { useEffect } from "react";
/* eslint-disable react/prop-types */
export const UpdateProfile = ({ setIsUpdateProfile }) => {
  // LOGIC FOR DISABLING BACKGROUND SCROLL BEHAVIOR WHILE MODAL/DIALOGUE BOX
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
      username: loggedInUser?.username || "",
      email: loggedInUser?.email || "",
      number: loggedInUser?.phoneNumber || "",
      bio: loggedInUser?.profile?.bio || "",
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

  const inputVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const staggerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1, // Time gap between each input animation
      },
    },
  };

  return (
    <section>
      <div className="backdrop-blur-sm fixed left-0 right-0 bottom-0 top-0 grid place-items-center z-50">
        <div className="bg-white fixed px-8 py-4 rounded-xl border w-1/3 shadow-2xl dark:shadow-none dark:bg-transparent dark:border-none">
          {/* HEADER */}
          <div className="text-4xl font-bold mb-2 text-[#1e0e4b] flex justify-between dark:text-white">
            <p>
              Update <span className="text-blue-400 font-bold">Profile</span>
            </p>
            <button onClick={() => setIsUpdateProfile(false)}>
              <IoCloseSharp />
            </button>
          </div>
          {/* UPDATE FORM */}
          <form
            encType="multipart/form-data"
            className="flex flex-col gap-3 dark:[&>div>label]:text-white"
            onSubmit={handleSubmit(onSubmit)}
          >
            <motion.div
              variants={staggerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-3"
            >
              {[
                { label: "Name", type: "text", name: "username" },
                { label: "Email", type: "email", name: "email" },
                { label: "Number", type: "number", name: "number" },
                { label: "Bio", type: "text", name: "bio" },
                { label: "Skills", type: "text", name: "skills" },
              ].map((field, index) => (
                <motion.div key={index} variants={inputVariants}>
                  <label
                    htmlFor={field.name}
                    className="my-auto text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2 dark:text-zinc-100"
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    {...register(field.name)}
                    className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block m-0 p-[8px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0 dark:bg-zinc-700 dark:border-none dark:text-gray-100"
                  />
                </motion.div>
              ))}

              {/* Profile Photo & Resume */}
              <motion.div variants={inputVariants}>
                <label className="my-auto text-gray-600 text-sm font-normal mb-2 dark:text-gray-100">
                  Profile Photo
                </label>
                <input
                  type="file"
                  {...register("profilePhoto")}
                  accept="image/*"
                  className="rounded border border-gray-200 text-sm w-full p-[8px] dark:bg-zinc-700 dark:border-none dark:text-gray-100"
                />
              </motion.div>

              <motion.div variants={inputVariants}>
                <label className="my-auto text-gray-600 text-sm font-normal mb-2 dark:text-gray-100">
                  Resume
                </label>
                <input
                  type="file"
                  {...register("resume")}
                  accept="application/pdf,application/vnd.ms-excel"
                  className="rounded border border-gray-200 text-sm w-full p-[8px] dark:bg-zinc-700 dark:border-none dark:text-gray-100"
                />
              </motion.div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="bg-blue-400 w-full m-auto px-6 py-2 rounded-full text-white text-sm font-normal hover:bg-blue-500 transition-colors"
              variants={inputVariants}
            >
              {loading ? (
                <div className="grid place-items-center">
                  <div className="loader"></div>
                </div>
              ) : (
                "Submit"
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
};
