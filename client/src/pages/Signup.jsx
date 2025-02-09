import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { handleSignupAPICall } from "../../Api/postAPI";

export const Signup = () => {
  //STATE VARIABLES
  const [loader, setLoader] = useState(false);

  //NAVIGATION
  const Navigate = useNavigate();

  //REACT UseForm HOOK
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //SUBMIT FN FOR SIGNUP
  const onSubmit = async (data) => {
    try {
      //LOADING = TRUE
      setLoader(true);

      //CALLING BACKEND API CALL FOR SIGNUP
      const response = await handleSignupAPICall(data);

      //IF RESPONSE IS OK
      if (response.data.SUCCESS) {
        setLoader(false); //LOADING = false
        Navigate("/login"); //NAVIGATE TO LOGIN PAGE WHEN SIGNUP SUCCESSFUL
        toast.success(response.data.MESSAGE);
      }
    } catch (error) {
      //TOAST FOR ERROR CASES
      toast.error(error.response.data.MESSAGE);
      setLoader(false);
    }
  };

  return (
    <>
      <div>
        <div className=" my-4 mx-auto max-w-lg relative flex flex-col px-4 py-0.5 rounded-xl text-black bg-white shadow-black drop-shadow-2xl">
          <div className="text-5xl font-bold mb-4 pt-3 text-[#1e0e4b] text-center">
            Signup To <span className="text-[#7747ff]"> JobiFY</span>
          </div>

          {/* SIGNUP FORM */}
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Username */}
            <div className="block relative">
              <label
                htmlFor="username"
                className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
              >
                Username
              </label>
              <input
                type="text"
                {...register("username", {
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
                })}
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
              />
              {errors.username && (
                <span className="text-blue-900">
                  *{errors.username.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="block relative">
              <label
                htmlFor="email"
                className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
              >
                Email
              </label>
              <input
                type="email"
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
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
              />
              {errors.email && (
                <span className="text-blue-900">*{errors.email.message}</span>
              )}
            </div>

            {/* Password */}
            <div className="block relative">
              <label
                htmlFor="password"
                className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
              >
                Password
              </label>
              <input
                type="text"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 8,
                    message: "Password should be at least 8 characters long",
                  },
                  pattern: {
                    value:
                      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                    message:
                      "Password should contain at least One Capital letter, Small letter, Number and Symbol",
                  },
                })}
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
              />
              {errors.password && (
                <span className="text-blue-900">
                  *{errors.password.message}
                </span>
              )}
            </div>

            {/* Confirm-Password */}
            <div className="block relative">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
              >
                Password
              </label>
              <input
                type="text"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Confirmation password is required",
                  },
                  validate: (val) => {
                    if (watch("password") != val) {
                      return "Your passwords do no match";
                    }
                  },
                })}
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
              />
              {errors.confirmPassword && (
                <span className="text-blue-900">
                  *{errors.confirmPassword.message}
                </span>
              )}
            </div>

            {/* NUMBER */}
            <div className="block relative">
              <label
                htmlFor="phoneNumber"
                className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
              >
                Phone no.
              </label>
              <input
                type="number"
                {...register("phoneNumber", {
                  required: {
                    value: true,
                    message: "Phone number is required",
                  },
                  minLength: {
                    value: 10,
                    message: "Phone number should be at least 10 digits long",
                  },
                  maxLength: {
                    value: 20,
                    message: "Phone number cannot be that long",
                  },
                })}
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
              />
              {errors.phoneNumber && (
                <span className="text-blue-900">
                  *{errors.phoneNumber.message}
                </span>
              )}
            </div>

            {/* ROLE */}
            <div className="relative flex justify-evenly">
              <div>
                <input
                  type="radio"
                  value="student"
                  {...register("role", {
                    required: {
                      value: true,
                      message: "Role is mandatory",
                    },
                  })}
                />
                <label htmlFor="student">Student</label>
              </div>
              <div>
                <input type="radio" value="recruiter" {...register("role")} />
                <label htmlFor="">Recruiter</label>
              </div>
              {errors.role && (
                <span className="text-blue-900">*{errors.role.message}</span>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
            >
              {/* WHILE LOADING SHOW LOADER */}
              {loader ? <div className="loader"></div> : "Submit"}
            </button>
          </form>

          {/* ADDITIONAL DATA */}
          <div className="text-sm text-center mt-[1rem] mb-2">
            Already have an account?{" "}
            <NavLink className="text-sm text-[#7747ff]" to="/login">
              Login!
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
