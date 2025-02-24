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
      className="flex flex-col gap-px dark:[&>div>label]:text-white "
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
          <span className="text-blue-900 dark:text-slate-200 text-sm ">
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
          <span className="text-blue-900 dark:text-slate-200 text-sm">
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
          className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
        />
        {errors.password && (
          <span className="text-blue-900 dark:text-slate-200 text-sm">
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
              if (watch("password") != val) {
                return "Your passwords do no match";
              }
            },
          })}
          className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
        />
        {errors.confirmPassword && (
          <span className="text-blue-900 dark:text-slate-200 text-sm">
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
          <span className="text-blue-900 dark:text-slate-200 text-sm">
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
        <div>
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
        {errors.role && (
          <span className="text-blue-900 dark:text-slate-200 text-sm">
            *{errors.role.message}
          </span>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
      >
        {/* WHILE LOADING SHOW LOADER */}
        {loading ? <div className="loader"></div> : "Submit"}
      </button>
    </form>
  );
};
