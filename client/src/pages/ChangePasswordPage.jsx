import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { changePasswordAPI } from "../../Api/postAPI";
import { toast } from "react-toastify";
import { setLoading } from "../../store/authSlice";
import { ChangePassForm } from "./pages components/ChangePassForm";

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
    <div className="py-32">
      <div className=" mx-auto max-w-lg relative flex flex-col p-4 rounded-3xl text-black bg-white shadow-black drop-shadow-2xl dark:bg-blue-950">
        <div className="text-3xl font-bold mb-2 text-[#1e0e4b] text-center">
          <span className="text-[#7747ff] block">New Password</span>
        </div>

        {/* Change password FORM */}
        <ChangePassForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};
