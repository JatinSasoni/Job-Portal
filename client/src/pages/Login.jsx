import { NavLink, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { handleLoginAPICall } from "../../Api/postAPI";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setLoading, setLoggedInUser } from "../../store/authSlice";
import { useEffect } from "react";
import { LoginForm } from "./pages components/LoginForm";

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
      <div className="py-8 ">
        <div className=" mx-auto max-w-lg relative flex flex-col p-4 rounded-3xl text-black bg-white shadow-black drop-shadow-2xl">
          <div className="text-5xl font-bold mb-2 text-[#1e0e4b] text-center">
            Welcome Back To <span className="text-[#7747ff]">Job Portal</span>
          </div>
          <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
            Log in to your account
          </div>

          {/* LOGIN-FORM */}
          <LoginForm onSubmit={onSubmit} />

          {/* ADDITIONAL OPTION */}
          <div className="text-sm text-center mt-[1.6rem]">
            Don’t have an account yet?{" "}
            <NavLink className="text-sm text-[#7747ff]" to="/signup">
              Sign up for free!
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
