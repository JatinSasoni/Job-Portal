import { useEffect } from "react";
import { handleGetAllAppliedJobs } from "../../Api/getAPI";
import { useDispatch, useSelector } from "react-redux";
import { setAllAppliedJobs } from "../../store/jobSlice";
import { motion } from "motion/react";

export const AppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAppliedJobs = async () => {
      try {
        const response = await handleGetAllAppliedJobs();
        if (response.data.SUCCESS) {
          dispatch(setAllAppliedJobs(response.data.appliedJobs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAppliedJobs();
  }, []);

  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <section className="mt-10 mb-5">
      {allAppliedJobs?.length ? (
        <>
          <h2 className="text-2xl mb-3 dark:text-white font-bold ">
            Applied jobs - {allAppliedJobs?.length}
          </h2>
          {/* TABLE CONTAINING JOBS APPLIED TO */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              type: "tween",
            }}
            className="relative overflow-x-auto shadow-md sm:rounded-lg"
          >
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              {/* TABLE HEAD */}
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-zinc-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Company Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Job Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Job Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              {/* TABLE BODY */}
              <tbody>
                {allAppliedJobs?.map((application, index) => {
                  return (
                    <tr
                      key={index}
                      className="odd:bg-white odd:dark:bg-zinc-800 even:bg-gray-50 even:dark:bg-zinc-700 border-b dark:border-gray-700 border-gray-200"
                    >
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div className="rounded-full size-10 border overflow-hidden">
                          <img
                            src={application?.job?.CompanyID?.logo}
                            alt="logo"
                            width="60"
                            height="20"
                            className="size-full"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {application?.job?.CompanyID?.companyName}
                      </td>
                      <td className="px-6 py-4">{application?.job?.title}</td>
                      <td className="px-6 py-4">{application?.job?.jobType}</td>
                      <td
                        className={`px-6 py-4 ${
                          application?.status === "pending"
                            ? "text-gray-500"
                            : application?.status === "accepted"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {application?.status?.toUpperCase()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        </>
      ) : (
        <p className="text-gray-600 dark:text-gray-300 text-lg text-center">
          All the jobs you applied for will be listed below!
        </p>
      )}
    </section>
  );
};
