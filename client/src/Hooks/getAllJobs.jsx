import { useEffect } from "react";
import { handleGetAllJobs } from "../../Api/getAPI";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setAllJobs, setPaginationData } from "../../store/jobSlice";
import { toast } from "react-toastify";
const useGetAllJobs = (sortOrder) => {
  const dispatch = useDispatch();
  const { filterQuery, filterSalary } = useSelector(
    (store) => store.job,
    shallowEqual
  );
  const { paginationData } = useSelector((store) => store.job, shallowEqual);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await handleGetAllJobs(
          filterQuery,
          paginationData?.page,
          paginationData?.limit
        );
        if (response.data.SUCCESS) {
          dispatch(
            setPaginationData({
              page: response?.data?.page,
              limit: response?.data?.limit,
              totalPage: Math.ceil(
                response?.data?.totalJobs / response?.data?.limit
              ),
            })
          );

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
      }
    };

    fetchAllJobs();
  }, [
    filterQuery,
    filterSalary,
    dispatch,
    sortOrder,
    paginationData.page,
    paginationData.limit,
  ]);
};

export default useGetAllJobs;
