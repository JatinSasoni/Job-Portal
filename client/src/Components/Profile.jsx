import { useState } from "react";
import { UpdateProfile } from "./UpdateProfile";
import { createPortal } from "react-dom";
import { ProfileInfo } from "./ProfileInfo";
import { AppliedJobs } from "./AppliedJobs";
import { useSelector } from "react-redux";

export const Profile = () => {
  //TOGGLE FOR UPDATE PROFILE
  const [isUpdateProfile, setIsUpdateProfile] = useState(false);
  const { loggedInUser } = useSelector((store) => store.auth);

  return (
    <div className="max-w-7xl mx-auto p-4 ">
      {/* PROFILE INFO */}
      <ProfileInfo setIsUpdateProfile={setIsUpdateProfile} />

      {/* APPLIED JOBS */}
      {loggedInUser?.role === "student" && <AppliedJobs />}

      {/* LOGIC FOR UPDATE PROFILE */}

      {isUpdateProfile &&
        createPortal(
          <UpdateProfile setIsUpdateProfile={setIsUpdateProfile} />,
          document.getElementById("reactportal")
        )}
    </div>
  );
};
