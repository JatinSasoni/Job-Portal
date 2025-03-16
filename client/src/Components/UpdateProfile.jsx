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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
        <div className=" fixed px-8 py-4 rounded-xl border w-1/3 shadow-xl dark:shadow-none dark:bg-transparent backdrop-blur dark:border-none ">
          {/* HEADER */}
          <div className="text-4xl font-bold text-zinc-700 flex justify-end dark:text-white">
            <button onClick={() => setIsUpdateProfile(false)}>
              <IoCloseSharp className="hover:rotate-90 duration-300" />
            </button>
          </div>
          {/* UPDATE FORM */}
          <form
            encType="multipart/form-data"
            className="flex flex-col gap-6 dark:[&>div>label]:text-white"
            onSubmit={handleSubmit(onSubmit)}
          >
            <motion.div
              variants={staggerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-3"
            >
              {[
                {
                  label: "Name",
                  type: "text",
                  name: "username",
                  validation: {
                    required: {
                      value: true,
                      message: "Username is required ",
                    },
                    minLength: {
                      value: 3,
                      message: "Username should be at least 3 characters long",
                    },
                    maxLength: {
                      value: 30,
                      message: "Username cannot be that long",
                    },
                  },
                },
                {
                  label: "Email",
                  type: "email",
                  name: "email",
                  validation: {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email format",
                    },
                  },
                },
                {
                  label: "Number",
                  type: "number",
                  name: "number",
                  validation: {
                    required: {
                      value: true,
                      message: "Phone number is required",
                    },
                    minLength: {
                      value: 10,
                      message: "Phone number should be at least 10 digits long",
                    },
                    maxLength: {
                      value: 10,
                      message: "Phone number cannot be that long",
                    },
                  },
                },
                { label: "Bio", type: "text", name: "bio" },
                ...(loggedInUser?.role !== "recruiter"
                  ? [{ label: "Skills", type: "text", name: "skills" }]
                  : []),
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
                    {...register(field.name, field.validation)}
                    className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block m-0 p-[8px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0 dark:bg-zinc-700 dark:border-none dark:text-gray-100"
                  />
                  {errors[field?.name] && (
                    <span className="text-blue-900 dark:text-blue-300 text-xs">
                      *{errors[field?.name].message}
                    </span>
                  )}
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

              {!(loggedInUser?.role === "recruiter") && (
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
              )}
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
