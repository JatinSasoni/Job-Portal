import { NavLink } from "react-router-dom";

/* eslint-disable react/prop-types */
export const NavProfileBox = ({ loggedInUser, handleLogoutUser }) => {
  return (
    <div className="w-72 bg-white z-20 rounded-md  absolute right-10 p-4 flex flex-col gap-2">
      <div className="flex gap-3">
        <div className="size-9 rounded-full cursor-pointer  bg-blue-400 overflow-hidden">
          <img
            src={loggedInUser?.profile?.profilePhoto}
            alt="pfp"
            className="size-full"
          />
        </div>
        <h2 className="mt-1 flex flex-col">~{loggedInUser?.username}</h2>
      </div>

      <p className="text-gray-400">{loggedInUser?.profile?.bio}</p>

      <div className="flex gap-4">
        <button className="p-1 w-full bg-blue-300 rounded">
          <NavLink to="/profile">Profile</NavLink>
        </button>
        <button
          className="p-1 w-full  bg-blue-300 rounded"
          onClick={handleLogoutUser}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
