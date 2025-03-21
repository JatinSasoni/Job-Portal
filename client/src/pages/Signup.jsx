import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleSignupAPICall } from "../../Api/postAPI";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/authSlice";
import { useEffect } from "react";
import { SignupForm } from "./pages components/SignupForm";
import { motion } from "motion/react";

export const Signup = () => {
  //DISPATCHER
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.auth);

  //NAVIGATION
  const Navigate = useNavigate();

  //SUBMIT FN FOR SIGNUP
  const onSubmit = async (data) => {
    try {
      //LOADING = TRUE
      dispatch(setLoading(true));

      //CALLING BACKEND API CALL FOR SIGNUP
      const response = await handleSignupAPICall(data);

      //IF RESPONSE IS OK
      if (response.data.SUCCESS) {
        Navigate("/login"); //NAVIGATE TO LOGIN PAGE WHEN SIGNUP SUCCESSFUL
        toast.success(response.data.MESSAGE);
      }
    } catch (error) {
      //TOAST FOR ERROR CASES
      toast.error(error.response.data.MESSAGE);
    } finally {
      dispatch(setLoading(false));
    }
  };

  //IF USER ALREADY LOGGED IN
  useEffect(() => {
    if (loggedInUser) {
      Navigate("/");
    }
  }, [loggedInUser, Navigate]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "tween", duration: 0.7 }}
      >
        <div className="text-5xl font-bold mt-8  lg:mt-20 xl:mt-0 xl:mb-4 md:pt-3  text-[#1e0e4b] text-center dark:text-white leading-tight ">
          Signup To <span className="text-blue-400 font-bold">TalentNest</span>
        </div>

        <div className=" my-4 mx-auto max-w-lg relative flex flex-col px-4 py-0.5 rounded-xl text-black dark:bg-zinc-900  dark:shadow-none md:shadow-md">
          {/* SIGNUP FORM */}
          <SignupForm onSubmit={onSubmit} />
          {/* ADDITIONAL DATA */}
          <div className="text-sm text-center mt-[1rem] mb-2 dark:text-slate-400">
            Already have an account?{" "}
            <NavLink
              className="text-sm text-[#7747ff] hover:dark:text-slate-100"
              to="/login"
            >
              Login!
            </NavLink>
          </div>
        </div>
      </motion.div>
    </>
  );
};
