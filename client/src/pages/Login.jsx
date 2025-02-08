import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

//LOGIN PAGE
export const Login = () => {
  //FOR NAVIGATION
  const Navigate = useNavigate();

  //STATE VARIABLES
  const [loader, setLoader] = useState(false);
  const [loggedIN, setLoggedIN] = useState(false);

  //USE FORM HOOK
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //SUBMIT FUNCTION
  const onSubmit = async (data) => {
    try {
      //LOADING STATE = TRUE
      setLoader(true);

      //MAKING API CALL TO SIGNUP
      const response = await axios.post(
        `${import.meta.env.VITE_USER_API_END_POINT}/login`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );

      //IF API CALL SUCCESS
      if (response.data.SUCCESS) {
        setLoader(false); //LOADING STATE = FALSE
        Navigate("/"); //NAVIGATE TO HOME PAGE IF LOGIN SUCCESSFUL
        toast.success(response.data.MESSAGE);
      }
    } catch (error) {
      //IF ANY ERROR FROM BACKEND (MISSING FIELD,INVALID EMAIL OR PASSWORD)
      toast.error(error.response.data.MESSAGE);
    }
  };

  return (
    <>
      <div className="py-8 ">
        <div className=" mx-auto max-w-lg relative flex flex-col p-4 rounded-3xl text-black bg-white shadow-black drop-shadow-2xl">
          <div className="text-5xl font-bold mb-2 text-[#1e0e4b] text-center">
            Welcome Back To <span className="text-[#7747ff]">Job Portal</span>
          </div>
          <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
            Log in to your account
          </div>

          {/* LOGIN-FORM */}
          <form
            className="flex flex-col gap-3"
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
                {...register("password", {
                  required: {
                    value: true,
                    message: "password is required",
                  },
                  minLength: {
                    value: 8,
                    message: "Password should be at-least 8 characters long",
                  },
                  pattern: {
                    value:
                      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                    message:
                      "Password should contain at least One Capital letter,Small letter, Number and Symbol",
                  },
                })}
                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
              />
              {errors.password && (
                <span className="text-blue-900">
                  *{errors.password.message}
                </span>
              )}
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
              {/* IF LOADING IS TRUE THEN SHOW LOADER ELSE SUBMIT BUTTON */}
              {loader ? <div className="loader"></div> : "Submit"}
            </button>
          </form>

          {/* ADDTIONAL OPTION */}
          <div className="text-sm text-center mt-[1.6rem]">
            Don’t have an account yet?{" "}
            <NavLink className="text-sm text-[#7747ff]" to="/signup">
              Sign up for free!
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
