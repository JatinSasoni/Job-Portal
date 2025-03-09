import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { contactFormAPI } from "../../Api/postAPI";
import { setLoading } from "../../store/authSlice";
import { motion } from "motion/react";

export const Contact = () => {
  const { loggedInUser, loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: loggedInUser?.username || "",
      email: loggedInUser?.email || "",
      message: "",
    },
  });

  // handle form getFormSubmissionInfo
  const onSubmit = async (data) => {
    if (loggedInUser) {
      if (
        data.username.toLowerCase() !== loggedInUser?.username?.toLowerCase() ||
        data.email !== loggedInUser?.email
      ) {
        toast.error("Please provide registered details");
        return;
      }
    }

    try {
      dispatch(setLoading(true));
      const response = await contactFormAPI(data);
      if (response.data.SUCCESS) {
        toast.success(response.data.MESSAGE);
        reset();
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <section>
        <div className=" my-4">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "tween",
              duration: 1,
            }}
            className="text-5xl text-slate-800 font-bold mb-2 text-center dark:text-slate-100"
          >
            Reach Out{" "}
            <span className=" text-blue-400 font-extrabold text-5xl dark:text-blue-300">
              TalentNest
            </span>
          </motion.div>
          <div className=" my-6  mx-auto max-w-lg relative flex flex-col p-4 rounded-3xl text-black dark:bg-zinc-900">
            {/* LOGIN-FORM */}
            <form
              className="flex flex-col gap-3  dark:[&>div>label]:text-white "
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* USERNAME */}
              <div className="block relative">
                <label
                  htmlFor="Username"
                  className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  id="Username"
                  {...register("username", {
                    required: {
                      value: true,
                      message: "Username is required",
                    },
                  })}
                  className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-1 ring-offset-2  ring-gray-900 outline-0 dark:bg-zinc-700 dark:border-none dark:text-gray-50"
                />
                {errors.username && (
                  <span className="text-blue-900 dark:text-blue-200 text-sm">
                    *{errors.username.message}
                  </span>
                )}
              </div>

              {/* EMAIl */}
              <div className="block relative">
                <label
                  htmlFor="email"
                  className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@gmail.com"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email format",
                    },
                  })}
                  className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-1 ring-offset-2  ring-gray-900 outline-0 dark:bg-zinc-700 dark:border-none dark:text-gray-50"
                />
                {errors.email && (
                  <span className="text-blue-900 text-sm dark:text-blue-200">
                    *{errors.email.message}
                  </span>
                )}
              </div>

              {/* MESSAGE/COMMENT */}
              <div className="block relative">
                <label
                  htmlFor="message"
                  className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Message here"
                  {...register("message", {
                    required: {
                      value: true,
                      message: "Message is required",
                    },
                  })}
                  // className="outline-none p-2 w-full resize-none h-40 dark:bg-zinc-700 rounded border border-gray-200 focus:ring-1 ring-offset-2"
                  className="resize-none h-40 rounded border  border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block  m-0 p-[11px] focus:ring-1 ring-offset-2  ring-gray-900 outline-0 dark:bg-zinc-700 dark:border-none dark:text-gray-50"
                ></textarea>
                {errors.message && (
                  <span className="text-blue-900 dark:text-blue-200 text-sm">
                    *{errors.message.message}
                  </span>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="bg-blue-400 w-full m-auto px-6 py-2 rounded-xl text-white text-sm dark:bg-blue-400 font-medium"
              >
                {/* IF LOADING IS TRUE THEN SHOW LOADER ELSE SUBMIT BUTTON */}
                {loading ? (
                  <div className="flex justify-center">
                    <div className="loader"></div>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
