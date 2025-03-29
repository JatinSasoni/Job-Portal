import { useEffect } from "react";
import { handleGetSingleCompanyDes } from "../../Api/getAPI";
import { useDispatch } from "react-redux";

import { setSingleCompanyData } from "../../store/companySlice";
import { toast } from "react-toastify";

//WHERE EVER THIS CUSTOM HOOK IS USED useEffect EXECUTE ACC TO ITS WORKING
const useGetSingleCompanyData = (companyID) => {
  //DISPATCH
  const dispatch = useDispatch();
  //FUNCTION DEFINED TO FETCH ALL JOBS
  const fetchSingleCompany = async (companyIDD) => {
    try {
      const response = await handleGetSingleCompanyDes(companyIDD);
      //IF DATA FETCHED SUCCESSFULLY
      if (response.data.SUCCESS) {
        dispatch(setSingleCompanyData(response.data.company));
      }
    } catch (error) {
      toast.error(error.response.data.MESSAGE);
    }
  };

  useEffect(() => {
    //CALLING OUT FUNCTION
    fetchSingleCompany(companyID);
  }, [companyID, dispatch]); ///DEPENDENCY MAI ID
};

export default useGetSingleCompanyData;
