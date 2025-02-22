import { Navbar } from "../Shared/Navbar";
import { useGetAllApplicants } from "../../Hooks/getAllApplicants";
import { useDispatch, useSelector } from "react-redux";
import { handleStatusUpdateAPI } from "../../../Api/postAPI";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setLoading } from "../../../store/authSlice";
import { ApplicationTableBody } from "./admin components/ApplicationTableBody";

export const AdminApplicantsTable = () => {
  const { jobID } = useParams();
  useGetAllApplicants(jobID);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allApplicants } = useSelector((store) => store.application);

  const handleUpdateStatus = async (status, applicationID) => {
    try {
      dispatch(setLoading(true));
      const response = await handleStatusUpdateAPI({ status }, applicationID);
      if (response.data.SUCCESS) {
        toast.success(response.data.MESSAGE);
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative overflow-x-auto my-8 mx-auto max-w-7xl z-0">
        <h1 className="my-2 text-3xl mx-a">
          Applicants {allApplicants?.length}
        </h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone no.
              </th>
              <th scope="col" className="px-6 py-3">
                Resume
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <ApplicationTableBody
            handleUpdateStatus={handleUpdateStatus}
            allApplicants={allApplicants}
          />
        </table>
      </div>
    </>
  );
};
