import { useEffect } from "react";
import { handleGetAllJobs } from "../../Api/getAPI";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "../../store/jobSlice";
import { toast } from "react-toastify";
const useGetAllJobs = (sortOrder) => {
  const dispatch = useDispatch();
  const { filterQuery, filterSalary } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await handleGetAllJobs(filterQuery);

        if (response.data.SUCCESS) {
          let jobs = response.data.allJobs;

          if (filterSalary.length === 2) {
            const [minSalary, maxSalary] = filterSalary.map(parseFloat);
            if (!isNaN(minSalary) && !isNaN(maxSalary)) {
              jobs = jobs.filter(
                ({ salary }) => salary >= minSalary && salary <= maxSalary
              );
            }
          }

          // Reverse the order only if sorting by oldest first
          if (sortOrder === "oldest") {
            jobs = jobs.reverse();
          }

          dispatch(setAllJobs(jobs));
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error(error?.response?.data?.MESSAGE);
      }
    };

    fetchAllJobs();
  }, [filterQuery, filterSalary, dispatch, sortOrder]);
};

export default useGetAllJobs;
