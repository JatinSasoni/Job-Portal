import { FaRegEdit } from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { MdNumbers } from "react-icons/md";

const dummySkills = ["html", "css", "javascript", "react"];

export const Profile = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 ">
      {/* PROFILE INFO */}
      <section className="flex flex-col gap-3 border p-3">
        {/* CONTAINER FOR PROFILE HEADER */}
        <div className=" flex justify-around">
          {/* PROFILE IMAGE AND NAME */}
          <div className="flex gap-4">
            <div className="size-16 rounded-full cursor-pointer  bg-blue-400 overflow-hidden">
              <img src="/Logo/pfp.jpg" alt="pfp" className="size-full" />
            </div>
            <div className="grid place-items-center">
              <h1 className="text-3xl">Jatin Sasoni</h1>
            </div>
          </div>

          {/* EDIT PROFILE */}
          <div className="grid place-items-center">
            <FaRegEdit className="size-10" />
          </div>
        </div>

        {/* BIO */}
        <div className="p-2">
          <div className="flex gap-2">
            <h3 className="text-2xl">Bio : </h3>
            <p className="my-auto">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptates aperiam delectus numquam.
            </p>
          </div>
        </div>

        {/* EMAIL AND NUMBER */}
        <div className=" p-2">
          <div className=" flex gap-3">
            <MdOutlineMarkEmailRead className="my-auto size-6" />
            <span className="text-xl">jatin@gmail.com</span>
          </div>
          <div className=" flex gap-3 ">
            <MdNumbers className="my-auto size-6" />
            <span className="text-xl">6284288651</span>
          </div>
        </div>

        {/* SKILLS */}
        <div>
          <h3 className="text-xl">Skills : </h3>
          <div className="flex gap-3">
            {dummySkills.length === 0
              ? "NA"
              : dummySkills.map((skill, ind) => {
                  return (
                    <p
                      key={ind}
                      className="inline-block py-1 px-3 bg-black text-white rounded-md"
                    >
                      skill
                    </p>
                  );
                })}
            {}
          </div>
        </div>

        {/* RESUME */}
        <div>
          <h3 className="text-xl">Resume :</h3>
          <div>
            <a href="/profile" className="text-blue-300">
              Resume link
            </a>
          </div>
        </div>
      </section>

      {/* APPLIED JOBS */}
      <section className="mt-4">
        <h2 className="text-2xl mb-3">Applied jobs</h2>

        {/* TABLE CONTAINING JOBS APPLIEND TO */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            {/* TABLE HEAD */}
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Job role
                </th>
                <th scope="col" className="px-6 py-3">
                  Company
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            {/* TABLE BODY */}
            <tbody>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  02-3-2024
                </td>
                <td className="px-6 py-4">Frontend Developer</td>
                <td className="px-6 py-4">GOOGLE</td>
                <td className="px-6 py-4">
                  <p className="p-2 bg-black text-white rounded-xl">pending</p>
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">White</td>
                <td className="px-6 py-4">Laptop PC</td>
                <td className="px-6 py-4">$1999</td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Magic Mouse 2
                </th>
                <td className="px-6 py-4">Black</td>
                <td className="px-6 py-4">Accessories</td>
                <td className="px-6 py-4">$99</td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Google Pixel Phone
                </th>
                <td className="px-6 py-4">Gray</td>
                <td className="px-6 py-4">Phone</td>
                <td className="px-6 py-4">$799</td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple Watch 5
                </th>
                <td className="px-6 py-4">Red</td>
                <td className="px-6 py-4">Wearables</td>
                <td className="px-6 py-4">$999</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
