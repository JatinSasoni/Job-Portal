import { useForm } from "react-hook-form";
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

  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      title: singleJobInfo?.title || "",
    },
  });

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

  // **Update the form values when `singleJobInfo` changes**
  useEffect(() => {
    if (singleJobInfo) {
      reset({
        title: singleJobInfo?.title || "",
        description: singleJobInfo?.description || "",
        requirements: singleJobInfo?.requirements.toString() || "",
        salary: singleJobInfo?.salary || "",
        jobType: singleJobInfo?.jobType || "",
        position: singleJobInfo?.position || "",
        experienceLevel: singleJobInfo?.experienceLevel || "",
        location: singleJobInfo?.location || "",
        CompanyID: singleJobInfo?.CompanyID || "",
      });
    }
  }, [singleJobInfo, reset]); // Run when `singleJobInfo` updates

  const onSubmit = async (data) => {
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

      <div className="mx-auto max-w-7xl pt-3 p-4 ">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "tween", duration: 1 }}
          className="text-5xl font-semibold mb-10 text-zinc-700 text-center dark:text-white"
        >
          Update<span className="text-blue-400 font-bold"> Job-Post</span>
        </motion.div>
        <PostJobForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          allCompanies={[]}
        />
      </div>
    </section>
  );
};
