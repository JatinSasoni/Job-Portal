import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { verifyOTPForPassAPI } from "../../Api/postAPI";
import { toast } from "react-toastify";
import { setLoading } from "../../store/authSlice";
import { motion } from "motion/react";
import { OtpLogic } from "../Components/ReactBits/OtpLogic";
import { useState } from "react";
import { Navbar } from "../Components/Shared/Navbar";
import { Footer } from "../Components/Shared/Footer";

export const VerifyOTPPage = () => {
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userID } = useParams();

  const [otp, setOtp] = useState(new Array(6).fill(""));

  const onSubmit = async (e) => {
    e.preventDefault();
    const combinedOtp = otp.join(""); //ARRAY TO STRING
    if (combinedOtp.length !== otp.length) {
      return;
    }
    try {
      dispatch(setLoading(true));

      const dataToSend = {
        userID,
        otp: combinedOtp,
      };

      const response = await verifyOTPForPassAPI(dataToSend);
      if (response.data.SUCCESS) {
        toast.success(response.data.MESSAGE);
        sessionStorage.setItem("otpVerified", "true");
        navigate(`/user/change/${userID}/password`);
      }
    } catch (error) {
      toast.error(error.response.data.MESSAGE);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Navbar />
      <div className="py-32 ">
        <div className="mx-3 md:mx-auto max-w-lg relative flex flex-col p-4 rounded-3xl text-black md:bg-white shadow-black md:drop-shadow-xl dark:bg-zinc-900">
          <motion.div
            initial={{
              y: -50,
            }}
            animate={{
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="text-4xl font-bold mb-2  text-center"
          >
            <span className="text-blue-400 font-bold ">Enter 6 Digit OTP</span>
          </motion.div>

          {/* OTP */}
          <form className="flex flex-col gap-5 " onSubmit={(e) => onSubmit(e)}>
            {/* OTP */}
            <OtpLogic length={otp.length} otp={otp} setOtp={setOtp} />
            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="bg-blue-400 w-full m-auto px-6 py-2 rounded-xl text-white text-sm font-normal "
            >
              {/* IF LOADING IS TRUE THEN SHOW LOADER ELSE SUBMIT BUTTON */}
              {loading ? (
                <div className="grid place-items-center">
                  <div className="loader"></div>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
