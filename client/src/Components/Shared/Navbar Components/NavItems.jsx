/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

export const NavItems = ({ loggedInUser }) => {
  return (
    <div className="grid place-items-center xl:ml-32 ">
      <ul className="flex gap-9 [&>*]:text-lg [&>*]:font-medium [&>*]:text-blue-950 ">
        {loggedInUser?.role === "recruiter" ? (
          <>
            <li>
              <NavLink to="/admin/companies">Companies</NavLink>
            </li>
            <li>
              <NavLink to="/admin/jobs">Jobs</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About us</NavLink>
            </li>
            <li>
              <NavLink to="/jobs">Jobs</NavLink>
            </li>
            <li>
              <NavLink to="/browse">Browse</NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
