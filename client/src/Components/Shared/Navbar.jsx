import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogoutAPICall } from "../../../Api/getAPI";
import { setLoggedInUser } from "../../../store/authSlice";
import { toast } from "react-toastify";
import { NavItems } from "./Navbar Components/NavItems";
import { NavProfileBox } from "./Navbar Components/NavProfileBox";
import { motion, useScroll } from "motion/react";
import { CiLock } from "react-icons/ci";

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
  const { loggedInUser, isDarkMode } = useSelector((state) => state.auth);
  //PROFILE MENU
  const [profileClicked, setProfileClicked] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

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
        className="w-full h-1 rounded-2xl z-50 bg-blue-600 dark:bg-blue-300 "
      ></motion.div>

      {/* HEADER */}
      <header
        className={`py-8 relative z-40  dark:shadow-white dark:drop-shadow-2xl  `}
      >
        <div className=" mx-auto max-w-7xl flex justify-around px-8">
          {/* COMPANY ICON */}
          <div>
            <div className="rounded-2xl size-16 overflow-hidden ">
              <Link to="/">
                <img
                  src={`${
                    isDarkMode ? "/Logo/newlogodark.png" : "/Logo/newlogo.png"
                  } `}
                  alt="logo"
                  width="60"
                  height="20"
                  className="size-full scale-150 "
                />
              </Link>
            </div>
          </div>

          {/* NAV ITEMS */}
          <NavItems loggedInUser={loggedInUser} />

          <div className="grid place-items-center">
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
              <div className=" flex gap-3">
                <div>
                  <NavLink to="/login">
                    <button className="flex gap-px  p-2 px-3 rounded-full font-medium group hover:bg-gray-100 hover:shadow-inner transition dark:text-white dark:hover:bg-zinc-500">
                      <CiLock className="my-auto transition-transform duration-300 group-hover:scale-110 " />
                      Login
                    </button>
                  </NavLink>
                </div>
                <div>
                  <NavLink to="/signup">
                    <button
                      type="submit"
                      className="flex justify-center gap-2 items-center mx-auto backdrop-blur-md lg:font-medium isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-blue-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-3 py-1 overflow-hidden border-2 rounded-full group dark:border-zinc-700 dark:text-white dark:before:bg-zinc-700"
                    >
                      Register
                      <svg
                        className="w-5 h-5 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-1 rotate-45 dark:bg-white"
                        viewBox="0 0 16 19"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                          className="fill-gray-800 group-hover:fill-gray-800"
                        ></path>
                      </svg>
                    </button>
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
