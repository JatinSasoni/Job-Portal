/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export const LoginForm = ({ onSubmit }) => {
  const { loading } = useSelector((state) => state.auth);

  //USE FORM HOOK
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
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
          <span className="text-blue-900">*{errors.password.message}</span>
        )}
      </div>

      {/* FORGET PASSWORD */}
      <div>
        <NavLink className="text-sm text-[#7747ff]" to="/user/reset-pass">
          Forgot your password?
        </NavLink>
      </div>

      {/* ROLE */}
      <div className="relative flex justify-evenly">
        <div>
          <input
            type="radio"
            value="student"
            id="student"
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
          <input
            type="radio"
            value="recruiter"
            {...register("role")}
            id="role"
          />
          <label htmlFor="role">Recruiter</label>
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
        {loading ? <div className="loader"></div> : "Submit"}
      </button>
    </form>
  );
};
