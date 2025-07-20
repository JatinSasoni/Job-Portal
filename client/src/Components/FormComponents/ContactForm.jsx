/* eslint-disable react/prop-types */

const ContactForm = ({ handleSubmit, onSubmit, register, errors, loading }) => {
  return (
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
            minLength: {
              value: 5,
              message: "Message must be at least 5 characters",
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
  );
};

export default ContactForm;
