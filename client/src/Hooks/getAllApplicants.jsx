import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleGetAllApplicantsAPI } from "../../Api/getAPI";
import { setApplicants } from "../../store/applicationSlice";
import { setLoading } from "../../store/authSlice";

//CUSTOM HOOK TO FETCH ALL APPLICANTS FOR ADMIN WHEN COMPONENT MOUNTS FOR THE FIRST TIME
export const useGetAllApplicants = (jobID) => {
  //DISPATCH
  const dispatch = useDispatch();
  useEffect(() => {
    //FUNCTION TO FETCH APPLICANTS
    const fetchApplicants = async (jobID) => {
      try {
        dispatch(setLoading(true));
        const response = await handleGetAllApplicantsAPI(jobID);

        if (response.data.SUCCESS) {
          dispatch(setApplicants(response.data.job.application));
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchApplicants(jobID);
  }, [jobID, dispatch]);
};
