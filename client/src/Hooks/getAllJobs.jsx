import { useEffect } from "react";
import { handleGetAllJobs } from "../../Api/getAPI";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setAllJobs, setPaginationData } from "../../store/jobSlice";
import { toast } from "react-toastify";
import { setLoading } from "../../store/authSlice";
import { DEFAULT_PAGE_NUMBER } from "../../util/Constants";
const useGetAllJobs = (sortOrder, scope) => {
  const dispatch = useDispatch();
  const { filterQuery, filterSalary } = useSelector(
    (store) => store.job,
    shallowEqual
  );
  const paginationData = useSelector(
    (store) => store.job.paginationData[scope],
    shallowEqual
  );

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        dispatch(setLoading(true));
        const response = await handleGetAllJobs(
          filterQuery,
          paginationData?.page,
          paginationData?.limit
        );

        if (response.data.SUCCESS) {
          const totalJobs = response?.data?.totalJobs; // Get totalJobs from backend
          const totalPages = Math.max(
            1,
            Math.ceil(totalJobs / paginationData?.limit)
          );

          // Update pagination only if totalPage has changed
          if (totalPages !== paginationData?.totalPage) {
            dispatch(
              setPaginationData({
                scope,
                data: {
                  totalPage: totalPages,
                  page: Math.min(DEFAULT_PAGE_NUMBER, totalPages),
                },
              })
            );
          }

          let jobs = response.data.allJobs;
          //ENSURES THERE IS SOMETHING IN FilterSalary
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
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchAllJobs();
  }, [
    filterQuery,
    filterSalary,
    dispatch,
    sortOrder,
    paginationData?.page,
    scope,
    paginationData?.limit,
  ]);
};

export default useGetAllJobs;
