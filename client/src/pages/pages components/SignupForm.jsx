/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export const SignupForm = ({ onSubmit }) => {
  const { loading } = useSelector((state) => state.auth);

  //REACT UseForm HOOK
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <form
      className="flex flex-col gap-2 md:gap-8 xl:gap-0.5 dark:[&>div>label]:text-white p-1 "
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
          className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0 dark:bg-zinc-700 dark:border-none dark:text-gray-100"
        />
        {errors.username && (
          <span className="text-blue-900 dark:text-blue-300 text-xs">
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
          className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0 dark:bg-zinc-700 dark:border-none dark:text-gray-100"
        />
        {errors.email && (
          <span className="text-blue-900 dark:text-blue-300  text-xs">
            *{errors.email.message}
          </span>
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
          className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0 dark:bg-zinc-700 dark:border-none dark:text-gray-100"
        />
        {errors.password && (
          <span className="text-blue-900 dark:text-blue-300  text-xs">
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
          Confirm Password
        </label>
        <input
          type="text"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Confirmation password is required",
            },
            validate: (val) => {
              if (watch("password") !== val) {
                return "Your passwords do no match";
              }
            },
          })}
          className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0 dark:bg-zinc-700 dark:border-none dark:text-gray-100"
        />
        {errors.confirmPassword && (
          <span className="text-blue-900 dark:text-blue-300  text-xs">
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
              value: 10,
              message: "Phone number cannot be that long",
            },
          })}
          className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0 dark:bg-zinc-700 dark:border-none dark:text-gray-100"
        />
        {errors.phoneNumber && (
          <span className="text-blue-900 dark:text-blue-300  text-xs">
            *{errors.phoneNumber.message}
          </span>
        )}
      </div>

      {/* ROLE */}
      <div className="relative flex justify-evenly my-px">
        <div className="flex gap-1">
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
          <label htmlFor="student" className="dark:text-white">
            Student
          </label>
        </div>
        <div className="flex gap-1">
          <input
            type="radio"
            value="recruiter"
            {...register("role")}
            id="recruiter"
          />
          <label htmlFor="recruiter" className="dark:text-white">
            Recruiter
          </label>
        </div>
      </div>
      {errors.role && (
        <span className="text-blue-900 dark:text-blue-300 text-center  text-xs">
          *{errors.role.message}
        </span>
      )}

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        className="bg-blue-400 font-medium w-full m-auto px-6 py-2 rounded  text-sm text-white  "
      >
        {/* WHILE LOADING SHOW LOADER */}
        {loading ? (
          <div className="grid place-items-center">
            <div className="loader"></div>{" "}
          </div>
        ) : (
          "Sign up"
        )}
      </button>
    </form>
  );
};
