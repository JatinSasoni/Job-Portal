import { NavLink } from "react-router-dom";
import { Navbar } from "../Shared/Navbar";
import { useEffect, useMemo, useState } from "react";
import { handleGetAllAdminJobs } from "../../../Api/getAPI";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RegisteredJobTable } from "./RegisteredJobTable";
import { setAllAdminJobs } from "../../../store/jobSlice";
import { JobNotFound } from "../JobNotFound";
import AdminButton from "./admin components/AdminButton";
import { motion } from "framer-motion";

export const AdminJobs = () => {
  const dispatch = useDispatch();
  const [filterInput, setFilterInput] = useState("");
  const [loading, setLoading] = useState(true);

  //EXECUTES ONLY WHEN COMPONENT IF MOUNTED FOR THE FIRST TIME
  useEffect(() => {
    const getAllAdminJobs = async () => {
      try {
        setLoading(true);
        const response = await handleGetAllAdminJobs();
        if (response.data.SUCCESS) {
          dispatch(setAllAdminJobs(response.data.postedJobs));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllAdminJobs();
  }, [dispatch]);

  const { allAdminJobs } = useSelector((store) => store.job, shallowEqual);

  //FILTER LOGIC -> EXECUTES FIRST TIME AND WHEN USER TYPES ON FILTER INPUT
  const filteredJobs = useMemo(() => {
    if (!filterInput || filterInput?.length === 0) return allAdminJobs;
    return allAdminJobs?.filter(
      (job) =>
        job?.title?.toLowerCase().includes(filterInput.toLowerCase()) ||
        job?.CompanyID?.companyName
          ?.toLowerCase()
          .includes(filterInput.toLowerCase())
    );
  }, [filterInput, allAdminJobs]);

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
    <>
      <Navbar />

      <section className=" mx-auto max-w-7xl pt-6 p-4">
        <div className="max-md:flex-col max-md:gap-2 flex justify-between md:p-3  ">
          <h1 className="text-3xl md:text-4xl text-slate-800 font-semibold dark:text-slate-100 max-md:text-center">
            Posted Jobs
          </h1>
          <NavLink to="/admin/job/create">
            <AdminButton label="Post New Job" />
          </NavLink>
        </div>
        <div className="max-md:py-6 py-2">
          <input
            type="text"
            placeholder="Filter by company or role..."
            className="border p-2 outline-none rounded-md dark:bg-zinc-800 dark:text-slate-50"
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
          />
        </div>

        {/* TABLE CONTAINING LIST OF REGISTERED COMPANIES */}
        <main className="md:mt-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "tween", duration: 0.6 }}
            className="relative sm:rounded-lg"
          >
            {!filteredJobs || filteredJobs?.length === 0 ? (
              <div className="h-96 overflow-hidden">
                <JobNotFound />
              </div>
            ) : (
              <div className="max-md:overflow-x-auto ">
                <RegisteredJobTable allAdminJobs={filteredJobs} />
              </div>
            )}
          </motion.div>
        </main>
      </section>
    </>
  );
};
