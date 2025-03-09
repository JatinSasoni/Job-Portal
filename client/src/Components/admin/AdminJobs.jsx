import { NavLink } from "react-router-dom";
import { Navbar } from "../Shared/Navbar";
import { useEffect, useMemo, useState } from "react";
import { handleGetAllAdminJobs } from "../../../Api/getAPI";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RegisteredJobTable } from "./RegisteredJobTable";
import { setAllAdminJobs } from "../../../store/jobSlice";
import { JobNotFound } from "../JobNotFound";
import { Footer } from "../Shared/Footer";

export const AdminJobs = () => {
  const dispatch = useDispatch();
  const [filterInput, setFilterInput] = useState("");

  //EXECUTES ONLY WHEN COMPONENT IF MOUNTED FOR THE FIRST TIME
  useEffect(() => {
    const getAllAdminJobs = async () => {
      try {
        const response = await handleGetAllAdminJobs();
        if (response.data.SUCCESS) {
          dispatch(setAllAdminJobs(response.data.postedJobs));
        }
      } catch (error) {
        console.log(error);
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

  return (
    <>
      <Navbar />

      <section className=" mx-auto max-w-7xl pt-6 p-4">
        <div className=" flex justify-between p-3 ">
          <h1 className="text-4xl text-slate-800 font-semibold dark:text-slate-100">
            Posted Jobs
          </h1>
          <NavLink to="/admin/job/create">
            <button className="button-34">Post New Job</button>
          </NavLink>
        </div>
        <div className="py-2">
          <input
            type="text"
            placeholder="Filter by company or role..."
            className="border p-2 outline-none rounded-md dark:bg-zinc-800 dark:text-slate-50"
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
          />
        </div>

        {/* TABLE CONTAINING LIST OF REGISTERED COMPANIES */}
        <main className="mt-5">
          <div className="relative ">
            {!filteredJobs || filteredJobs.length === 0 ? (
              <div className="h-96 overflow-hidden">
                <JobNotFound />
              </div>
            ) : (
              <RegisteredJobTable allAdminJobs={filteredJobs} />
            )}
          </div>
        </main>
      </section>
    </>
  );
};
