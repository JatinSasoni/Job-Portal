import { useNavigate } from "react-router-dom";
import { Navbar } from "../Shared/Navbar";

import { toast } from "react-toastify";
import { handlePostJobAPI } from "../../../Api/postAPI";
import { PostJobForm } from "./admin components/PostJobForm";

export const RegisterNewJob = () => {
  const navigate = useNavigate();

  //   ONSUBMIT FN
  const onSubmit = async (data) => {
    try {
      const response = await handlePostJobAPI(data);
      if (response.data.SUCCESS) {
        toast.success(response.data.MESSAGE);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.MESSAGE);
    }
  };

  return (
    <section>
      <Navbar />

      <div className=" mx-auto max-w-7xl  p-4 ">
        <h1 className="text-4xl text-zinc-800 font-bold dark:text-slate-100  text-center mb-3">
          <p className="text-5xl font-semibold  text-zinc-700 text-center dark:text-white">
            Post a{" "}
            <span className="text-blue-400 font-bold"> Job Opportunity</span>
          </p>
        </h1>

        <PostJobForm onSubmit={onSubmit} />
      </div>
    </section>
  );
};
