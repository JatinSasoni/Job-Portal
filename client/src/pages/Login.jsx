import { NavLink, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { handleLoginAPICall } from "../../Api/postAPI";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setLoading, setLoggedInUser } from "../../store/authSlice";
import { useEffect } from "react";
import { LoginForm } from "./pages components/LoginForm";
import { motion } from "motion/react";
import { Navbar } from "../Components/Shared/Navbar";

//LOGIN PAGE
export const Login = () => {
  //HOOK FOR NAVIGATION
  const Navigate = useNavigate();

  //DISPATCHER
  const dispatch = useDispatch();

  //SELECTOR
  const { loggedInUser } = useSelector((state) => state.auth, shallowEqual);

  //SUBMIT FUNCTION
  const onSubmit = async (data) => {
    try {
      //LOADING STATE TO TRUE
      dispatch(setLoading(true));

      //MAKING API CALL TO LOGIN
      const response = await handleLoginAPICall(data);

      //IF API CALL SUCCESS
      if (response.data.SUCCESS) {
        //---IF USER SUCCESSFULLY LOGGED IN--
        dispatch(setLoggedInUser(response.data.user));
        Navigate("/"); //NAVIGATE TO HOME PAGE IF LOGIN SUCCESSFUL
        toast.success(response.data.MESSAGE);
      }
    } catch (error) {
      //IF ANY ERROR FROM BACKEND (MISSING FIELD,INVALID EMAIL OR PASSWORD)
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
      <Navbar />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "tween", duration: 0.5 }}
        className="mt-4"
      >
        <div className="text-5xl font-bold mb-2 text-[#1e0e4b] text-center dark:text-slate-100">
          Welcome Back To{" "}
          <span className=" font-extrabold text-5xl text-blue-300">
            TalentNest
          </span>
        </div>

        <div className=" mx-auto max-w-lg relative flex flex-col p-3  rounded-3xl text-black bg-white dark:bg-zinc-900  ">
          <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b] dark:text-slate-200">
            Log in to your account
          </div>

          {/* LOGIN-FORM */}
          <LoginForm onSubmit={onSubmit} />

          {/* ADDITIONAL OPTION */}
          <div className="text-sm text-center mt-[1.6rem] dark:text-slate-300">
            Don’t have an account yet?{" "}
            <NavLink
              className="text-sm dark:text-[#a183f5] text-[#7747ff] hover:dark:text-white"
              to="/signup"
            >
              Sign up for free!
            </NavLink>
          </div>
        </div>
      </motion.div>
    </>
  );
};
