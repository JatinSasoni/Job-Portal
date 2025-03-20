import { PostJobForm } from "./admin components/PostJobForm";
import { useEffect, useState } from "react";
import { handleGetJobInfoAPI } from "../../../Api/getAPI";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../Shared/Navbar";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../store/authSlice";
import { toast } from "react-toastify";
import { handleEditJobAPI } from "../../../Api/postAPI";
import { motion } from "motion/react";

export const UpdateJobPost = () => {
  const { jobID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [singleJobInfo, setSingleJobInfo] = useState(null);

  useEffect(() => {
    const getSingleJobPost = async (jobID) => {
      try {
        const response = await handleGetJobInfoAPI(jobID);
        if (response.data.SUCCESS) {
          setSingleJobInfo(response.data.job);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getSingleJobPost(jobID);
  }, [jobID]);

  const onSubmit = async (data) => {
    console.log(data);

    try {
      dispatch(setLoading(true));
      const response = await handleEditJobAPI(jobID, data);

      if (response.data.SUCCESS) {
        toast.success(response.data.MESSAGE);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.MESSAGE);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <section>
      <Navbar />
      <div className="mx-auto max-w-7xl md:flex md:gap-14 p-2 ">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "tween", duration: 1 }}
          className="hidden md:flex flex-col items-center gap-14 p-4 pt-10 "
        >
          <div>
            <p className="text-5xl font-semibold  text-zinc-700 text-center dark:text-white">
              Modify<span className="text-blue-400 font-bold"> Job-Post</span>
            </p>
            <p className="text-md text-gray-600 dark:text-gray-300 mt-2 text-center">
              Update job details and keep opportunities fresh.
            </p>
          </div>
          <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img
              src={singleJobInfo?.CompanyID?.logo}
              className="md:size-80 lg:size-96 rounded-full"
              alt="CompanyLogo"
              loading="lazy"
            />
          </div>
        </motion.div>
        <p className="text-3xl md:hidden font-semibold  text-zinc-700 text-center dark:text-white">
          Modify<span className="text-blue-400 font-bold"> Job-Post</span>
        </p>
        <PostJobForm singleJobInfo={singleJobInfo} onSubmit={onSubmit} />
      </div>
    </section>
  );
};
