import { useEffect } from "react";
import { handleGetAllJobs } from "../../Api/getAPI";
import { useDispatch } from "react-redux";
import { setAllJobs } from "../../store/jobSlice";

//WHERE EVER THIS CUSTOM HOOK IS USED useEffect EXECUTE ACC TO ITS WORKING
const useGetAllJobs = () => {
  //DISPATCH
  const dispatch = useDispatch();

  useEffect(() => {
    //FUNCTION DEFINED TO FETCH ALL JOBS
    const fetchAllJobs = async () => {
      try {
        const response = await handleGetAllJobs();
        //IF DATA FETCHED SUCCESSFULLY
        if (response.data.SUCCESS) {
          dispatch(setAllJobs(response.data.allJobs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    //CALLING OUT FUNCTION
    fetchAllJobs();
  }, []);
};

export default useGetAllJobs;
