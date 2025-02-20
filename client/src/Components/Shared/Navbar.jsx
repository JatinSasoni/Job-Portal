import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogoutAPICall } from "../../../Api/getAPI";
import { setLoggedInUser } from "../../../store/authSlice";
import { toast } from "react-toastify";
import { NavItems } from "./Navbar Components/NavItems";
import { NavProfileBox } from "./Navbar Components/NavProfileBox";

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
        toast.success(response.data.MESSAGE);
        dispatch(setLoggedInUser(null));
        Navigate("/"); //NAVIGATE TO HOME PAGE IF LOGOUT
      }
    } catch (error) {
      toast.error(error.data.MESSAGE);
    }
  };

  //FINDING OUT IF USER LOGGED IN
  const { loggedInUser } = useSelector((state) => state.auth);

  //PROFILE MENU
  const [profileClicked, setProfileClicked] = useState(false);

  return (
    <header className="py-7 bg-blue-50 drop-shadow-xl ">
      <div className="container mx-auto max-w-7xl flex justify-between px-5">
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
          <div>
            {/* IF USER IS LOGGED IN SHOW HIS/HER PROFILE BOX ELSE REGISTER AND LOGIN */}
            {loggedInUser ? (
              <div className="relative">
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
      </div>
    </header>
  );
};
