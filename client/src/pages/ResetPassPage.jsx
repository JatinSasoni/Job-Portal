import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { generateOTPForPassAPI } from "../../Api/postAPI";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../store/authSlice";
import { motion } from "motion/react";
import { Navbar } from "../Components/Shared/Navbar";
import { Footer } from "../Components/Shared/Footer";

export const ResetPassPage = () => {
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));
      const response = await generateOTPForPassAPI(data);

      if (response.data.SUCCESS) {
        toast.success(response.data.MESSAGE);
        navigate(`/user/${response.data.userID}/verify-otp`);
      }
    } catch (error) {
      toast.error(error.response.data.MESSAGE);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Navbar />
      <div className="py-28">
        <motion.div
          initial={{
            y: -100,
          }}
          animate={{
            y: 0,
          }}
          transition={{
            duration: 1,
            type: "spring",
          }}
          className=" mx-auto max-w-lg relative flex flex-col p-4 rounded-3xl text-black md:bg-white shadow-black drop-shadow-sm md:drop-shadow-md dark:bg-zinc-900"
        >
          <div className="text-3xl font-bold mb-2 text-[#1e0e4b] text-center dark:text-slate-200">
            Forgot Your Password?
            <span className="text-blue-400 block font-semibold">
              We Are Here
            </span>
          </div>

          {/* LOGIN-FORM */}
          <form
            className="flex flex-col gap-3 dark:[&>div>label]:text-white"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                id="email"
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
                <span className="text-blue-900 dark:text-red-500 text-sm">
                  *{errors.email.message}
                </span>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="bg-blue-400 w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
            >
              {/* IF LOADING IS TRUE THEN SHOW LOADER ELSE SUBMIT BUTTON */}
              {loading ? <div className="loader"></div> : "Send OTP"}
            </button>
          </form>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};
