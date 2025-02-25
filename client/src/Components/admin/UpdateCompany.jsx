import { Navbar } from "../Shared/Navbar";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { handleUpdateComAPI } from "../../../Api/postAPI";
import useGetSingleCompanyData from "../../Hooks/getSingleCompanyByItsID";
import { setLoading } from "../../../store/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export const UpdateCompany = () => {
  const { companyID } = useParams();

  useGetSingleCompanyData(companyID);

  const { singleCompanyData } = useSelector((store) => store.company);

  //USE FORM HOOK
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // **Update the form values when `singleCompanyData` changes**
  useEffect(() => {
    if (singleCompanyData) {
      reset({
        companyName: singleCompanyData.companyName || "",
        description: singleCompanyData.description || "",
        location: singleCompanyData.location || "",
        website: singleCompanyData.website || "",
      });
    }
  }, [singleCompanyData, reset]); // Run when `singleCompanyData` updates

  //LOADING STATE
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //onSubmit
  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));
      //FORM DATA
      const formData = new FormData();
      formData.append("companyName", data.companyName);
      formData.append("description", data.description);
      formData.append("location", data.location);
      formData.append("website", data.website);

      if (data.companyLogo) {
        formData.append("file", data.companyLogo[0]);
      }

      const response = await handleUpdateComAPI(formData, companyID);

      if (response.data.SUCCESS) {
        toast.success(response.data.MESSAGE);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.MESSAGE);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <section>
      <Navbar />
      <>
        <div className="py-8 ">
          <div className=" mx-auto max-w-lg relative flex flex-col p-4 rounded-3xl text-black bg-white shadow-black drop-shadow-2xl dark:bg-blue-950">
            <div className="text-5xl font-bold mb-2 text-[#1e0e4b] text-center dark:text-white">
              Update<span className="text-[#7747ff] "> Company</span>
            </div>
            <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]"></div>

            {/* LOGIN-FORM */}
            <form
              className="flex flex-col gap-3 dark:[&>div>label]:text-white"
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              {/* company name */}
              <div className="block relative">
                <label
                  htmlFor="companyName"
                  className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  {...register("companyName", {
                    required: {
                      value: true,
                      message: "companyName is required",
                    },
                  })}
                  className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
                />
                {errors.companyName && (
                  <span className="text-blue-900">
                    *{errors.companyName.message}
                  </span>
                )}
              </div>

              {/* description */}
              <div className="block relative">
                <label
                  htmlFor="description"
                  className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
                >
                  description
                </label>
                <input
                  type="text"
                  {...register("description", {
                    required: {
                      value: true,
                      message: "description is required",
                    },
                  })}
                  className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                />
                {errors.description && (
                  <span className="text-blue-900">
                    *{errors.description.message}
                  </span>
                )}
              </div>

              <div className="block relative">
                <label
                  htmlFor="location"
                  className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
                >
                  Location
                </label>
                <input
                  type="text"
                  {...register("location", {
                    required: {
                      value: true,
                      message: "location is required",
                    },
                  })}
                  className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
                />
                {errors.location && (
                  <span className="text-blue-900">
                    *{errors.location.message}
                  </span>
                )}
              </div>

              <div className="block relative">
                <label
                  htmlFor="website"
                  className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
                >
                  Website
                </label>
                <input
                  type="text"
                  id="website"
                  {...register("website", {
                    required: {
                      value: true,
                      message: "website is required",
                    },
                  })}
                  placeholder="*NA if no website currently*"
                  className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
                />
                {errors.website && (
                  <span className="text-blue-900">
                    *{errors.website.message}
                  </span>
                )}
              </div>

              <div className="block relative">
                <label
                  htmlFor="file"
                  className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
                >
                  Logo
                </label>
                <input
                  type="file"
                  id="file"
                  {...register("companyLogo")}
                  className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0 dark:text-white"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
              >
                {/* IF LOADING IS TRUE THEN SHOW LOADER ELSE SUBMIT BUTTON */}
                {loading ? <div className="loader"></div> : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </>
    </section>
  );
};
