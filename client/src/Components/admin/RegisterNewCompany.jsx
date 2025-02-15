import { NavLink, useNavigate } from "react-router-dom";
import { Navbar } from "../Shared/Navbar";
import { handleRegisterComAPI } from "../../../Api/postAPI";
import { useState } from "react";
import { toast } from "react-toastify";

export const RegisterNewCompany = () => {
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();

  //REGISTER NEW COMPANY
  const handleRegisterNewCompany = async (e) => {
    e.preventDefault();

    try {
      const response = await handleRegisterComAPI({ companyName });

      if (response.data.SUCCESS) {
        toast.success(response.data.MESSAGE);
        navigate(`/admin/companies`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.MESSAGE);
    }
  };

  return (
    <section>
      <Navbar />

      <div className=" mx-auto max-w-7xl pt-8 p-4">
        <div className=" flex justify-between p-3">
          <h1 className="text-3xl">Registered a new company</h1>
          <NavLink to="/admin/companies">
            <button className="button-34">Go Back</button>
          </NavLink>
        </div>
        <form
          action=""
          className="flex flex-col gap-3 mt-4 p-4"
          onSubmit={handleRegisterNewCompany}
        >
          <div className="">
            <label
              htmlFor="companyName"
              className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
            >
              Company name
            </label>
            <input
              type="text"
              placeholder="Company Name..."
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
            />
          </div>
          <button className="button-34" type="submit">
            Register
          </button>
        </form>
      </div>
    </section>
  );
};
