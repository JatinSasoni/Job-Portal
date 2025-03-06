import { NavLink } from "react-router-dom";
import { Navbar } from "../Shared/Navbar";
import { useEffect, useMemo, useState } from "react";
import { handleGetAllCompanyDes } from "../../../Api/getAPI";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setAllCompanies } from "../../../store/companySlice";
import { RegisteredComTable } from "./RegisteredComTable";
import { motion } from "motion/react";
import { JobNotFound } from "../JobNotFound";

export const AdminCompanies = () => {
  const dispatch = useDispatch();
  const [filterInput, setFilterInput] = useState("");

  //EXECUTES ONLY WHEN COMPONENT IF MOUNTED FOR THE FIRST TIME
  useEffect(() => {
    const getAllCompanies = async () => {
      try {
        const response = await handleGetAllCompanyDes();

        if (response.data.SUCCESS) {
          dispatch(setAllCompanies(response.data.companies));
        }
      } catch (error) {
        console.log("Error fetching companies", error);
      }
    };
    getAllCompanies();
  }, [dispatch]);

  const { allCompanies } = useSelector((store) => store.company, shallowEqual);

  // Deriving filtered data dynamically instead of using state
  const filteredCompanies = useMemo(() => {
    if (!filterInput || filterInput?.length === 0) return allCompanies;
    return allCompanies?.filter((company) =>
      company?.companyName?.toLowerCase().includes(filterInput.toLowerCase())
    );
  }, [filterInput, allCompanies]);

  return (
    <>
      <Navbar />

      <section className=" mx-auto max-w-7xl pt-8 p-4">
        <div className=" flex justify-between p-3 ">
          <h1 className="text-4xl text-slate-800 font-semibold dark:text-slate-100">
            Registered Companies
          </h1>
          <NavLink to="/admin/register">
            <button className="button-34">Register Company</button>
          </NavLink>
        </div>
        <div className="py-2">
          <input
            type="text"
            placeholder="Filter By name..."
            className="border p-2 outline-none rounded-md dark:bg-zinc-800 dark:text-slate-50"
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
          />
        </div>

        {/* TABLE CONTAINING LIST OF REGISTERED COMPANIES */}
        <main className="mt-5">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 1 }}
            className="relative sm:rounded-lg"
          >
            {!filteredCompanies || filteredCompanies.length === 0 ? (
              <div className="h-96 overflow-hidden">
                <JobNotFound />
              </div>
            ) : (
              <RegisteredComTable allCompanies={filteredCompanies} />
            )}
          </motion.div>
        </main>
      </section>
    </>
  );
};
