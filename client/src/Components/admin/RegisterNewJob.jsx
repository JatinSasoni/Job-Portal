import { NavLink, useNavigate } from "react-router-dom";
import { Navbar } from "../Shared/Navbar";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { handlePostJobAPI } from "../../../Api/postAPI";
import { PostJobForm } from "./admin components/PostJobForm";

export const RegisterNewJob = () => {
  const navigate = useNavigate();
  //USE FORM HOOK
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  //STORE
  const { allCompanies } = useSelector((store) => store.company);

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

      <div className=" mx-auto max-w-7xl pt-8 p-4 ">
        <div className=" flex justify-between p-3">
          <h1 className="text-4xl  font-bold dark:text-slate-100">
            Post new job
          </h1>
          <NavLink to="/admin/jobs">
            <button className="button-34">Go Back</button>
          </NavLink>
        </div>

        <PostJobForm
          allCompanies={allCompanies}
          onSubmit={onSubmit}
          register={register}
          handleSubmit={handleSubmit}
        />
      </div>
    </section>
  );
};
