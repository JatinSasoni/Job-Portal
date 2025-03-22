import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { handleApplyForJob, handleGetSingleJob } from "../../Api/getAPI";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { setSingleJobData } from "../../store/jobSlice";
import { setLoading } from "../../store/authSlice";

export const JobProfile = () => {
  //JOB ID TO FETCH JOB DESCRIPTION
  const { jobID } = useParams();

  //LOGGED IN USER DATA FROM REDUX STORE
  const { loggedInUser: user, loading } = useSelector((store) => store.auth);

  //JOB DATA FROM REDUX STORE
  const { singleJobData } = useSelector((store) => store.job);
  //INITIAL STATE WHICH WILL HELP TO FIND OUT WHETHER JOB IS ALREADY APPLIED OR NOT

  const initialState =
    singleJobData?.application?.some((application) => {
      return application?.applicant === user?._id; //RETURN TRUE IF USER ALREADY AN APPLICANT OTHERWISE FALSE
    }) || false;

  const [alreadyApplied, setAlreadyApplied] = useState(initialState);

  //DISPATCH FUNCTION TO UPDATE JOB DATA SO IF USER APPLIES TO JOB IT SHOWS REAL TIME DATA
  const dispatch = useDispatch();

  //HANDLE APPLY FOR JOB
  const applyForJob = async () => {
    try {
      dispatch(setLoading(true));
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
    } finally {
      dispatch(setLoading(false));
    }
  };

  // useGetSingleJob(jobID);
  useEffect(() => {
    //FUNCTION DEFINED TO FETCH ALL JOBS
    const fetchSingleJob = async (jobID) => {
      try {
        dispatch(setLoading(true));
        const response = await handleGetSingleJob(jobID);
        //IF DATA FETCHED SUCCESSFULLY
        if (response.data.SUCCESS) {
          dispatch(setSingleJobData(response.data.job));
          setAlreadyApplied(
            response.data.job?.application?.some((application) => {
              return application?.applicant === user?._id; //RETURN TRUE IF USER ALREADY AN APPLICANT OTHERWISE FALSE
            })
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    //CALLING OUT FUNCTION
    fetchSingleJob(jobID);
  }, [jobID, dispatch, user?._id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      <section className="mx-auto max-w-7xl  p-6 dark:text-white">
        {/* Job Header */}
        <div className="flex flex-col max-md:gap-4 md:flex-row justify-between items-center bg-gray-100 dark:bg-zinc-800 p-6 rounded-lg shadow-md">
          {/* Company Logo & Name */}
          <div className="flex items-center gap-4">
            <img
              src={singleJobData?.CompanyID?.logo}
              alt="Company Logo"
              className="max-md:w-12 max-md:h-12 w-16 h-16 object-fill rounded-full shadow"
            />
            <h1 className="max-md:text-2xl text-3xl font-bold">
              {singleJobData?.CompanyID?.companyName}
            </h1>
          </div>

          {/* Apply Button */}
          <button
            className={`px-6 max-md:py-2 py-3 rounded-lg text-white font-semibold transition ${
              alreadyApplied
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            }`}
            disabled={alreadyApplied}
            onClick={applyForJob}
          >
            {loading ? (
              <div className="animate-spin h-5 w-5 border-4 border-blue-100 border-t-transparent rounded-full mx-auto"></div>
            ) : alreadyApplied ? (
              "Already Applied"
            ) : (
              "Apply Now"
            )}
          </button>
        </div>

        {/* Job Info */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-blue-50 dark:bg-zinc-800 rounded-lg shadow-md text-center">
            <span className="text-lg font-semibold text-blue-800 dark:text-blue-300">
              {singleJobData?.position}
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Positions
            </p>
          </div>
          <div className="p-4 bg-red-50 dark:bg-zinc-800 rounded-lg shadow-md text-center">
            <span className="text-lg font-semibold text-red-600 dark:text-red-400">
              {singleJobData?.jobType}
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-300">Job Type</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-zinc-800 rounded-lg shadow-md text-center">
            <span className="text-lg font-semibold text-purple-600">
              {singleJobData?.salary} LPA
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-300">Salary</p>
          </div>
        </div>

        {/* Job Description */}
        <div className="mt-8 bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold border-b pb-3">
            Job Description
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <span className="font-semibold text-lg text-blue-900 dark:text-zinc-400">
                Role:{" "}
              </span>
              {singleJobData?.title}
            </div>
            <div>
              <span className="font-semibold text-lg text-blue-900 dark:text-zinc-400 ">
                Location:{" "}
              </span>
              {singleJobData?.location}
            </div>
            <div>
              <span className="font-semibold text-lg text-blue-900 dark:text-zinc-400 ">
                Description:{" "}
              </span>
              {singleJobData?.description}
            </div>
            <div>
              <span className="font-semibold text-lg text-blue-900 dark:text-zinc-400 ">
                Experience:{" "}
              </span>
              {singleJobData?.experienceLevel} Years
            </div>
            <div>
              <span className="font-semibold text-lg text-blue-900 dark:text-zinc-400 ">
                Salary:{" "}
              </span>
              {singleJobData?.salary} LPA
            </div>
            <div>
              <span className="font-semibold text-lg text-blue-900 dark:text-zinc-400 ">
                Requirements:{" "}
              </span>
              {singleJobData?.requirements?.join(", ")}
            </div>
            <div>
              <span className="font-semibold text-lg text-blue-900 dark:text-zinc-400 ">
                Total Applicants:{" "}
              </span>
              {singleJobData?.application?.length}
            </div>
            <div>
              <span className="font-semibold text-lg text-blue-900 dark:text-zinc-400 ">
                Posted Date:{" "}
              </span>
              {singleJobData?.createdAt?.split("T")[0]}
            </div>
            <div>
              <span className="text-lg text-blue-900 dark:text-zinc-400 ">
                company website:{" "}
              </span>
              <a
                href={
                  singleJobData?.CompanyID?.website?.startsWith("http")
                    ? singleJobData.CompanyID.website
                    : `https://${singleJobData?.CompanyID?.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline hover:text-blue-800 transition duration-300"
              >
                {singleJobData?.CompanyID?.website}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
