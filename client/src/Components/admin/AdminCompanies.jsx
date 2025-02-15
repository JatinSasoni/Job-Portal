import { NavLink } from "react-router-dom";
import { Navbar } from "../Shared/Navbar";
import { useEffect, useState } from "react";
import { handleGetAllCompanyDes } from "../../../Api/getAPI";
import { useDispatch, useSelector } from "react-redux";
import { setAllCompanies } from "../../../store/companySlice";
import { RegisteredComTable } from "./RegisteredComTable";
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
        console.log(error);
      }
    };
    getAllCompanies();
  }, []);

  const { allCompanies } = useSelector((store) => store.company);
  const [filterData, setFilterData] = useState(allCompanies);

  //FILTER LOGIC -> EXECUTES FIRST TIME AND WHEN USER TYPES ON FILTER INPUT
  useEffect(() => {
    if (filterInput === "") {
      setFilterData(allCompanies);
      return;
    }

    const companyFilter = filterData?.filter((company) => {
      if (
        company?.companyName?.toLowerCase().includes(filterInput.toLowerCase())
      ) {
        return true;
      }
      return false;
    });

    setFilterData(companyFilter);
  }, [filterInput, allCompanies]);

  return (
    <>
      <Navbar />

      <section className=" mx-auto max-w-7xl pt-8 p-4">
        <div className=" flex justify-between p-3 ">
          <h1 className="text-3xl">Registered Companies</h1>
          <NavLink to="/admin/register">
            <button className="button-34">Register Company</button>
          </NavLink>
        </div>
        <div className="py-2">
          <input
            type="text"
            placeholder="Filter By name..."
            className="border p-2 outline-none rounded-md"
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
          />
        </div>

        {/* TABLE CONTAINING LIST OF REGISTERED COMPANIES */}
        <main className="mt-5">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <RegisteredComTable allCompanies={filterData} />
          </div>
        </main>
      </section>
    </>
  );
};
