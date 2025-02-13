import { useSelector } from "react-redux";
import useGetSingleJob from "../Hooks/getSingleJobByItsID";
import { useParams } from "react-router-dom";
import { Navbar } from "../Components/Shared/Navbar";

export const JobProfile = () => {
  const { jobID } = useParams();

  const alreadyApplied = false;
  useGetSingleJob(jobID);
  const { singleJobData } = useSelector((store) => store.job);

  return (
    <>
      <Navbar />
      <section className="mx-auto max-w-7xl my-4 p-6">
        {/* NAME AND APPLY BUTTON */}
        <div className="flex justify-between ">
          <h1 className="text-3xl font-bold">
            {singleJobData?.CompanyID?.companyName}
          </h1>
          <button
            className={`${alreadyApplied ? "button-1" : "button-34"}`}
            disabled={alreadyApplied}
          >
            {alreadyApplied ? "Already applied" : "Apply now"}
          </button>
        </div>
        {/* positions and all */}
        <div className=" p-2 flex gap-3">
          <span className="p-2 border bg-blue-50 rounded-3xl text-blue-800">
            {singleJobData?.position} Positions
          </span>
          <span className="p-2 border bg-blue-50 rounded-3xl text-red-600">
            {singleJobData?.jobType}
          </span>
          <span className="p-2 border bg-blue-50 rounded-3xl text-purple-500">
            {singleJobData?.salary} LPA
          </span>
        </div>

        {/* JOB DESCRIPTION */}
        <div>
          <h2 className="text-xl border-b-2 py-3">Job Description</h2>

          <div className="flex flex-col gap-2">
            <div>
              <span className="text-xl font-semibold">Role </span>
              {singleJobData?.title}
            </div>
            <div>
              <span className="text-xl font-semibold">Location </span>
              Mohali
            </div>
            <div>
              <span className="text-xl font-semibold">Description </span>
              {singleJobData?.description}
            </div>
            <div>
              <span className="text-xl font-semibold">Experience </span>
              {singleJobData?.experienceLevel} Years
            </div>
            <div>
              <span className="text-xl font-semibold">Salary </span>
              {singleJobData?.salary}LPA
            </div>
            <div>
              <span className="text-xl font-semibold">Total Applicants </span>
              {singleJobData?.application?.length}
            </div>
            <div>
              <span className="text-xl font-semibold">Posted Date </span>
              {singleJobData?.createdAt?.split("T")[0]}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
