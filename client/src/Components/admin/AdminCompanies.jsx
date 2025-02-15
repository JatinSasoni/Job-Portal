import { NavLink } from "react-router-dom";
import { Navbar } from "../Shared/Navbar";
import { useEffect } from "react";
import { handleGetAllCompanyDes } from "../../../Api/getAPI";
import { useDispatch, useSelector } from "react-redux";
import { setAllCompanies } from "../../../store/companySlice";
export const AdminCompanies = () => {
  const dispatch = useDispatch();

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

  return (
    <>
      <Navbar />

      <section className=" mx-auto max-w-7xl pt-8 p-4">
        <div className=" flex justify-between p-3">
          <h1 className="text-3xl">Registered Companies</h1>
          <NavLink to="/admin/register">
            <button className="button-34">Register Company</button>
          </NavLink>
        </div>

        {/* TABLE CONTAINING LIST OF REGISTERED COMPANIES */}
        <main className="mt-5">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              {/* TABLE HEAD */}
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Logo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Company name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Website
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Update
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                </tr>
              </thead>
              {/* TABLE BODY */}
              <tbody>
                {allCompanies?.map((company, indx) => {
                  return (
                    <tr
                      key={indx}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                    >
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        NOT SET
                      </td>
                      <td className="px-6 py-4">{company?.companyName}</td>
                      <td className="px-6 py-4">{company?.location}</td>
                      <td className="px-6 py-4">{company?.website}</td>
                      <td className="px-6 py-4">
                        <NavLink to={`/admin/company/update/${company?._id}`}>
                          <button className="p-2 bg-blue-500 text-white rounded-xl px-4">
                            Edit
                          </button>
                        </NavLink>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 bg-blue-800 text-white rounded-xl px-4">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </main>
      </section>
    </>
  );
};
