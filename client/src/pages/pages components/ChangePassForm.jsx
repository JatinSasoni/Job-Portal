/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export const ChangePassForm = ({ onSubmit }) => {
  const { loading } = useSelector((store) => store.auth);

  //USE FORM HOOK
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  return (
    <form
      className="flex flex-col gap-4 dark:[&>div>label]:text-white"
      onSubmit={handleSubmit(onSubmit)}
    >
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
          {...register("newPassword", {
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
          className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0 dark:bg-zinc-700 dark:border-none dark:text-white "
        />
        {errors.newPassword && (
          <span className="text-blue-900 text-sm dark:text-red-500 ">
            *{errors.newPassword.message}
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
              if (watch("newPassword") != val) {
                return "Your passwords do no match";
              }
            },
          })}
          className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0 dark:bg-zinc-700 dark:border-none dark:text-white"
        />
        {errors.confirmPassword && (
          <span className="text-blue-900 dark:text-red-500 text-sm">
            *{errors.confirmPassword.message}
          </span>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        className="bg-blue-400 w-full m-auto px-6 py-2 rounded-xl text-white text-sm font-normal"
      >
        {/* IF LOADING IS TRUE THEN SHOW LOADER ELSE SUBMIT BUTTON */}
        {loading ? (
          <div className="grid place-items-center">
            <div className="loader"></div>{" "}
          </div>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};
