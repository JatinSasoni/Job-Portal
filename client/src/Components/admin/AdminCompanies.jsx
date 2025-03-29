import { NavLink } from "react-router-dom";
import { Navbar } from "../Shared/Navbar";
import { useEffect, useMemo, useState } from "react";
import { handleGetAllCompanyDes } from "../../../Api/getAPI";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setAllCompanies } from "../../../store/companySlice";
import { RegisteredComTable } from "./RegisteredComTable";
import { motion } from "framer-motion";
import { JobNotFound } from "../JobNotFound";
import AdminButton from "./admin components/AdminButton";

export const AdminCompanies = () => {
  const dispatch = useDispatch();
  const [filterInput, setFilterInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllCompanies = async () => {
      try {
        const response = await handleGetAllCompanyDes();
        if (response.data.SUCCESS) {
          dispatch(setAllCompanies(response.data.companies));
        }
      } catch (error) {
        console.error(
          "Error fetching companies:",
          error?.response?.data || error
        );
      } finally {
        setLoading(false);
      }
    };
    getAllCompanies();
  }, [dispatch]);

  const { allCompanies } = useSelector((store) => store.company, shallowEqual);

  const filteredCompanies = useMemo(() => {
    if (!filterInput) return allCompanies;
    return allCompanies?.filter((company) =>
      company.companyName.toLowerCase().includes(filterInput.toLowerCase())
    );
  }, [filterInput, allCompanies]);

  const handleFilterChange = (e) => {
    setFilterInput(e.target.value);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-96 lg:h-[calc(100vh-112px)]">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="mx-auto max-w-7xl pt-6 p-4 mb-8">
        <div className="max-md:flex-col max-md:gap-2 flex justify-between md:p-3">
          <h1 className="text-3xl md:text-4xl text-slate-800 font-semibold dark:text-slate-100 max-md:text-center">
            Registered Companies
          </h1>
          <NavLink to="/admin/register">
            <AdminButton label="Register Company" />
          </NavLink>
        </div>
        <div className="max-md:py-6 py-2">
          <input
            type="text"
            placeholder="Filter By name..."
            className="border p-2 outline-none rounded-md dark:bg-zinc-800 dark:text-slate-50"
            value={filterInput}
            onChange={handleFilterChange}
          />
        </div>

        <main className="mt-5">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "tween", duration: 0.6 }}
            className="relative sm:rounded-lg"
          >
            {!filteredCompanies || filteredCompanies.length === 0 ? (
              <div className="h-96 overflow-hidden">
                <JobNotFound />
              </div>
            ) : (
              <div className="max-md:overflow-x-auto shadow-md">
                <RegisteredComTable allCompanies={filteredCompanies} />
              </div>
            )}
          </motion.div>
        </main>
      </section>
    </>
  );
};
