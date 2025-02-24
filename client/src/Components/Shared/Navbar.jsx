import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogoutAPICall } from "../../../Api/getAPI";
import { setLoggedInUser } from "../../../store/authSlice";
import { toast } from "react-toastify";
import { NavItems } from "./Navbar Components/NavItems";
import { NavProfileBox } from "./Navbar Components/NavProfileBox";
import { motion, useScroll } from "motion/react";

export const Navbar = () => {
  //DISPATCH TO PROVIDE ACTIONS TO REDUX STORE
  const dispatch = useDispatch();
  //FOR NAVIGATION
  const Navigate = useNavigate();
  //LOGOUT LOGIC
  const handleLogoutUser = async () => {
    try {
      const response = await handleLogoutAPICall();
      if (response.data.SUCCESS) {
        dispatch(setLoggedInUser(null));
        setProfileClicked(false);
        Navigate("/"); //NAVIGATE TO HOME PAGE IF LOGOUT
        toast.success(response.data.MESSAGE);
      }
    } catch (error) {
      toast.error(error.data.MESSAGE);
    }
  };
  //FINDING OUT IF USER LOGGED IN
  const { loggedInUser } = useSelector((state) => state.auth);
  //PROFILE MENU
  const [profileClicked, setProfileClicked] = useState(false);
  const { scrollYProgress } = useScroll();
  return (
    <>
      {/* PROGRESS BAR */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          originX: 0,
        }}
        className="w-full h-1 rounded-xl z-50 bg-blue-500  "
      ></motion.div>

      <header className="py-7 bg-blue-50 drop-shadow-xl relative z-40 dark:bg-gray-900 dark:shadow-white dark:drop-shadow-2xl">
        <div className=" mx-auto max-w-7xl flex justify-between px-5">
          {/* COMPANY ICON */}
          <div>
            <div className="rounded-2xl size-10">
              <img
                src="/Logo/logo3.png"
                alt="logo"
                width="60"
                height="20"
                className="h-full "
              />
            </div>
          </div>

          {/* NAV ITEMS */}
          <NavItems loggedInUser={loggedInUser} />

          <div>
            {/* IF USER IS LOGGED IN SHOW HIS/HER PROFILE BOX ELSE REGISTER AND LOGIN */}
            {loggedInUser ? (
              <div className="relative">
                {/* LOGO */}
                <div
                  className="size-9 rounded-full cursor-pointer  bg-blue-400 overflow-hidden "
                  onClick={() => setProfileClicked(!profileClicked)}
                >
                  <img
                    src={loggedInUser?.profile?.profilePhoto}
                    alt="pfp"
                    className="size-full"
                  />
                </div>

                {/* profile-box ---IF USER CLICKS ON PROFILE IMG*/}
                {profileClicked && (
                  <NavProfileBox
                    loggedInUser={loggedInUser}
                    handleLogoutUser={handleLogoutUser}
                    setProfileClicked={setProfileClicked}
                  />
                )}
              </div>
            ) : (
              <div className="flex gap-4">
                <NavLink to="/signup">
                  <button className="button-34">Register</button>
                </NavLink>
                <NavLink to="/login">
                  <button className="button-33">Login</button>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
