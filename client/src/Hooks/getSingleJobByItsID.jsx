import { useEffect } from "react";

import { handleGetSingleJob } from "../../Api/getAPI";
import { useDispatch } from "react-redux";
import { setSingleJobData } from "../../store/jobSlice";

//WHERE EVER THIS CUSTOM HOOK IS USED useEffect EXECUTE ACC TO ITS WORKING
const useGetSingleJob = (jobID) => {
  //DISPATCH
  const dispatch = useDispatch();

  useEffect(() => {
    //FUNCTION DEFINED TO FETCH ALL JOBS
    const fetchSingleJob = async (jobID) => {
      try {
        const response = await handleGetSingleJob(jobID);
        //IF DATA FETCHED SUCCESSFULLY
        if (response.data.SUCCESS) {
          dispatch(setSingleJobData(response.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };

    //CALLING OUT FUNCTION
    fetchSingleJob(jobID);
  }, []);
};

export default useGetSingleJob;
