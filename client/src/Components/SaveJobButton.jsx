/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { saveUnsavePostAPI } from "../../Api/postAPI";
import { toast } from "react-toastify";
import { setLoggedInUser } from "../../store/authSlice";
import { CiBookmarkPlus } from "react-icons/ci";

const SaveJobButton = ({ jobId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const { loggedInUser } = useSelector((store) => store.auth, shallowEqual);
  const dispatch = useDispatch();

  // Set initial state when component mounts
  useEffect(() => {
    setIsSaved(loggedInUser?.savedJobs?.includes(jobId));
  }, [jobId, loggedInUser?.savedJobs]);

  const handleSaveJob = async (jobId) => {
    try {
      const res = await saveUnsavePostAPI(jobId);
      if (res.data.SUCCESS) {
        setIsSaved((prev) => !prev); // Toggle the save state
        // toast.success(res.data.MESSAGE);
        dispatch(setLoggedInUser(res?.data?.user));
      }
    } catch (error) {
      toast.error(error.response.data.MESSAGE);
    }
  };

  return (
    <button
      onClick={() => handleSaveJob(jobId)}
      className={`text-zinc-800 border rounded bg-zinc-100 dark:bg-zinc-700 dark:text-white dark:border-none py-1`}
    >
      <span className="flex justify-center gap-1 group ">
        {isSaved && (
          <CiBookmarkPlus className="my-auto group group-hover:scale-125 transition-transform" />
        )}
        {isSaved ? `Saved ` : "Save"}
      </span>
    </button>
  );
};

export default SaveJobButton;
