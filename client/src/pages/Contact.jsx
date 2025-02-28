import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
export const Contact = () => {
  const { loggedInUser, loading } = useSelector((store) => store.auth);

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
    console.log(data);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: loggedInUser?.username || "",
      email: loggedInUser?.email || "",
      message: "",
    },
  });

  return (
    <>
      <section>
        <div className="p-16">
          <div className=" mx-auto max-w-lg relative flex flex-col p-4 rounded-3xl text-black bg-white shadow-black drop-shadow-2xl dark:bg-blue-950">
            <div className="text-3xl font-bold mb-2 text-[#1e0e4b] text-center dark:text-slate-200">
              Reach Out to Us
              <span className="text-[#7747ff] block"></span>
            </div>

            {/* LOGIN-FORM */}
            <form
              className="flex flex-col gap-3 dark:[&>div>label]:text-white "
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
                  id="Username"
                  {...register("username", {
                    required: {
                      value: true,
                      message: "Username is required",
                    },
                  })}
                  className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-1 ring-offset-2  ring-gray-900 outline-0"
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
                  className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-1 ring-offset-2  ring-gray-900 outline-0"
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
                  {...register("message", {
                    required: {
                      value: true,
                      message: "Message is required",
                    },
                  })}
                  className="outline-none p-2 w-full resize-none h-40"
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
                className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
              >
                {/* IF LOADING IS TRUE THEN SHOW LOADER ELSE SUBMIT BUTTON */}
                {loading ? <div className="loader"></div> : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
