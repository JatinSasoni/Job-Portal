import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { contactFormAPI } from "../../Api/postAPI";
import { setLoading } from "../../store/authSlice";
import { motion } from "motion/react";
import { Navbar } from "../Components/Shared/Navbar";
import ContactForm from "../Components/FormComponents/ContactForm";

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
      <Navbar />
      <section>
        <div className=" my-4">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "tween",
              duration: 1,
            }}
            className="text-5xl text-zinc-700 font-bold mb-2 text-center dark:text-slate-100"
          >
            Reach Out{" "}
            <span className=" text-blue-400 font-extrabold md:text-5xl dark:text-blue-300">
              TalentNest
            </span>
          </motion.div>
          <div className=" my-6  mx-auto max-w-lg relative flex flex-col p-4 rounded-3xl text-black dark:bg-zinc-900">
            {/* CONTACT-FORM */}
            <ContactForm
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              register={register}
              errors={errors}
              loading={loading}
            />
          </div>
        </div>
      </section>
    </>
  );
};
