import { Navbar } from "../Shared/Navbar";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { handleUpdateComAPI } from "../../../Api/postAPI";
import useGetSingleCompanyData from "../../Hooks/getSingleCompanyByItsID";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const UpdateCompany = () => {
  const { companyID } = useParams();

  useGetSingleCompanyData(companyID);

  const { singleCompanyData } = useSelector((store) => store.company);
  const [localLoading, setLocalLoading] = useState(false);

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

  const navigate = useNavigate();

  //onSubmit
  const onSubmit = async (data) => {
    try {
      setLocalLoading(true);
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
      toast.error(error.response.data.MESSAGE);
    } finally {
      setLocalLoading(false);
    }
  };
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-112px)]">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      </>
    );
  }

  return (
    <section>
      <Navbar />
      <>
        <div className="max-md:mt-8 ">
          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "tween",
              duration: 0.5,
            }}
            className="text-3xl md:text-5xl font-semibold md:mb-2 text-zinc-700 text-center dark:text-white tracking-tight"
          >
            Manage Company
            <span className="text-blue-400 font-bold"> Profile</span>
          </motion.h2>
          <div className="mx-auto max-w-lg relative flex flex-col p-4 rounded-3xl text-black shadow-black drop-shadow-sm dark:bg-zinc-900 dark:drop-shadow-none">
            <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]"></div>

            {/* LOGIN-FORM */}
            <motion.form
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "tween",
                duration: 0.5,
              }}
              className="flex flex-col gap-4 dark:[&>div>label]:text-white"
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
                  className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-10 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0 dark:bg-zinc-700 dark:text-gray-50 dark:border-none"
                />
                {errors.companyName && (
                  <span className="text-blue-900 text-sm dark:text-blue-300">
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
                  className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-10 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0 dark:bg-zinc-700 dark:text-gray-50 dark:border-none"
                />
                {errors.description && (
                  <span className="text-blue-900 text-sm dark:text-blue-300">
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
                  className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-10 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0 dark:bg-zinc-700 dark:text-gray-50 dark:border-none"
                />
                {errors.location && (
                  <span className="text-blue-900 text-sm dark:text-blue-300">
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
                  className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-10 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0 dark:bg-zinc-700 dark:text-gray-50 dark:border-none"
                />
                {errors.website && (
                  <span className="text-blue-900 text-sm dark:text-blue-300">
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
                  className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-10 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0 dark:bg-zinc-700 dark:text-gray-50 dark:border-none"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="bg-blue-400 w-full rounded-xl m-auto px-6 py-2  text-white text-sm font-normal"
              >
                {/* IF LOADING IS TRUE THEN SHOW LOADER ELSE SUBMIT BUTTON */}
                {localLoading ? (
                  <div className="grid place-items-center">
                    <div className="loader"></div>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </motion.form>
          </div>
        </div>
      </>
    </section>
  );
};
