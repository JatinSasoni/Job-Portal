import { useDispatch, useSelector } from "react-redux";
import useGetSingleJob from "../Hooks/getSingleJobByItsID";
import { useParams } from "react-router-dom";
import { Navbar } from "../Components/Shared/Navbar";
import { handleApplyForJob } from "../../Api/getAPI";
import { toast } from "react-toastify";
import { useState } from "react";
import { setSingleJobData } from "../../store/jobSlice";

export const JobProfile = () => {
  //JOB ID TO FETCH JOB DESCRIPTION
  const { jobID } = useParams();

  //DISPATCH FUNCTION TO UPDATE JOB DATA SO IF USER APPLIES TO JOB IT SHOWS REAL TIME DATA
  const dispatch = useDispatch();

  //CUSTOM HOOK WHICH WILL FETCH JOB DATA BASES ON JOB ID AND STORE JOB DATA ON REDUX STORE
  useGetSingleJob(jobID);

  //JOB DATA FROM REDUX STORE
  const { singleJobData } = useSelector((store) => store.job);
  //LOGGED IN USER DATA FROM REDUX STORE
  const { loggedInUser: user } = useSelector((store) => store.auth);

  //INITIAL STATE WHICH WILL HELP TO FIND OUT WHETHER JOB IS ALREADY APPLIED OR NOT
  const initialState = singleJobData?.application?.some((application) => {
    return application?.applicant === user?._id; //RETURN TRUE IF USER ALREADY AN APPLICANT OTHERWISE FALSE
  });
  const [alreadyApplied, setAlreadyApplied] = useState(initialState);

  //HANDLE APPLY FOR JOB
  const applyForJob = async () => {
    try {
      const response = await handleApplyForJob(jobID);
      if (response.data.SUCCESS) {
        toast.success(response.data.MESSAGE); //TOAST FOR USER
        setAlreadyApplied(true); //UPDATE LOCAL STATE TO DISABLE APPLY BUTTON

        //UPDATING JOB DATA (REAL TIME DATA) IN REDUX STORE
        const updateSingleData = {
          ...singleJobData,
          application: [...singleJobData.application, { applicant: user?._id }],
        };

        dispatch(setSingleJobData(updateSingleData));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.MESSAGE);
    }
  };

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
            onClick={applyForJob}
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
