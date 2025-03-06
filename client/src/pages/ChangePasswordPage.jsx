import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { changePasswordAPI } from "../../Api/postAPI";
import { toast } from "react-toastify";
import { setLoading } from "../../store/authSlice";
import { ChangePassForm } from "./pages components/ChangePassForm";
import { motion } from "motion/react";

export const ChangePasswordPage = () => {
  const { userID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));
      const dataToSend = {
        newPassword: data.newPassword,
        userID,
      };
      const response = await changePasswordAPI(dataToSend);
      if (response.data.SUCCESS) {
        toast.success(response.data.MESSAGE);
        sessionStorage.removeItem("otpVerified");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.MESSAGE);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="py-20">
      <motion.div
        initial={{
          y: 100,
        }}
        animate={{
          y: 0,
        }}
        transition={{
          duration: 1,
          type: "spring",
        }}
        className=" mx-auto max-w-lg relative flex flex-col p-4 rounded-3xl text-black bg-white shadow-black drop-shadow-2xl dark:bg-zinc-900"
      >
        <div className="text-3xl font-bold mb-2 text-[#1e0e4b] text-center">
          <span className="text-blue-400 font-bold text-4xl block">
            New Password
          </span>
        </div>

        {/* Change password FORM */}
        <ChangePassForm onSubmit={onSubmit} />
      </motion.div>
    </div>
  );
};
