import { NavLink } from "react-router-dom";
import { Navbar } from "../Shared/Navbar";
import { useEffect, useState } from "react";
import { handleGetAllAdminJobs } from "../../../Api/getAPI";
import { useDispatch, useSelector } from "react-redux";
import { RegisteredJobTable } from "./RegisteredJobTable";
import { setAllAdminJobs } from "../../../store/jobSlice";
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
  }, []);

  const { allAdminJobs } = useSelector((store) => store.job);
  const [filterData, setFilterData] = useState(allAdminJobs);

  //FILTER LOGIC -> EXECUTES FIRST TIME AND WHEN USER TYPES ON FILTER INPUT
  useEffect(() => {
    if (filterInput === "") {
      setFilterData(allAdminJobs);
      return;
    }

    const jobFilter = filterData?.filter((job) => {
      if (
        job?.title?.toLowerCase().includes(filterInput.toLowerCase()) ||
        job?.CompanyID?.companyName
          ?.toLowerCase()
          .includes(filterInput.toLowerCase())
      ) {
        return true;
      }
      return false;
    });

    setFilterData(jobFilter);
  }, [filterInput, allAdminJobs]);

  return (
    <>
      <Navbar />

      <section className=" mx-auto max-w-7xl pt-8 p-4">
        <div className=" flex justify-between p-3 ">
          <h1 className="text-3xl">Posted Jobs</h1>
          <NavLink to="/admin/job/create">
            <button className="button-34">Post New Job</button>
          </NavLink>
        </div>
        <div className="py-2">
          <input
            type="text"
            placeholder="Filter by company or role..."
            className="border p-2 outline-none rounded-md"
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
          />
        </div>

        {/* TABLE CONTAINING LIST OF REGISTERED COMPANIES */}
        <main className="mt-5">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <RegisteredJobTable allAdminJobs={filterData} />
          </div>
        </main>
      </section>
    </>
  );
};
