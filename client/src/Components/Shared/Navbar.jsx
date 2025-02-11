import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export const Navbar = () => {
  //FINDING OUT IF USER LOGGED IN
  const { loggedInUser } = useSelector((state) => state.auth);
  const [profileClicked, setProfileClicked] = useState(false);

  return (
    <header className="py-7 bg-blue-50 drop-shadow-xl ">
      <div className="container mx-auto max-w-7xl flex justify-between px-5">
        <div>
          <div className="rounded-2xl size-10">
            <img
              src="/Logo/logo3.png"
              alt=""
              width="60"
              height="20"
              className="h-full "
            />
          </div>
        </div>
        <div className="grid place-items-center xl:ml-32">
          <ul className="flex gap-9 [&>*]:text-lg [&>*]:font-medium [&>*]:text-blue-950 ">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/">About us</NavLink>
            </li>
            <li>
              <NavLink to="/jobs">Jobs</NavLink>
            </li>
            <li>
              <NavLink to="/">Browse</NavLink>
            </li>
          </ul>
        </div>
        <div>
          <div>
            {loggedInUser ? (
              <div>
                <div
                  className="size-9 rounded-full cursor-pointer  bg-blue-400 overflow-hidden"
                  onClick={() => setProfileClicked(!profileClicked)}
                >
                  <img src="/Logo/pfp.jpg" alt="pfp" className="size-full" />
                </div>

                {/* profile-box */}

                {profileClicked && (
                  <div className="w-72 bg-white z-10 rounded-md  absolute right-10 p-4 flex flex-col gap-2">
                    <div className="flex gap-3">
                      <div className="size-9 rounded-full cursor-pointer  bg-blue-400 overflow-hidden">
                        <img
                          src="/Logo/pfp.jpg"
                          alt="pfp"
                          className="size-full"
                        />
                      </div>
                      <h2 className="mt-1 flex flex-col">~Jatin Sasoni</h2>
                    </div>

                    <p className="text-gray-400">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    </p>

                    <div className="flex gap-4">
                      <button className="p-1 w-full bg-blue-300 rounded">
                        <NavLink to="/profile">Profile</NavLink>
                      </button>
                      <button className="p-1 w-full  bg-blue-300 rounded">
                        Logout
                      </button>
                    </div>
                  </div>
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
