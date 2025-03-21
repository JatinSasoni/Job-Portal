import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  setFilterQuery,
  setFilterSalary,
  setPaginationData,
} from "../../../store/jobSlice";
import {
  DEFAULT_PAGE_LIMIT,
  DEFAULT_PAGE_NUMBER,
} from "../../../util/Constants";

export const FilterAside = () => {
  const dispatch = useDispatch();

  const { filterQuery, filterSalary, paginationData } = useSelector(
    (store) => store.job,
    shallowEqual // Prevents re-renders if values don't change
  );

  // Initialize local state with Redux values
  const [filterState, setFilterState] = useState({
    keyword: filterQuery || "", // Use Redux state if available
    salaryRange: filterSalary.length ? filterSalary : [0, 999],
  });

  const handlePopKeyChange = (e) => {
    const keyword = e.target.value;
    setFilterState((prev) => ({ ...prev, keyword }));
    dispatch(setFilterQuery(keyword));
    dispatch(
      setPaginationData({ ...paginationData, page: DEFAULT_PAGE_NUMBER })
    );
  };

  const handleSalaryRange = (e) => {
    const salaryValues = e.target.value.split("-").map(Number);
    setFilterState((prev) => ({ ...prev, salaryRange: salaryValues }));
    dispatch(setFilterSalary(salaryValues));
  };

  const resetFilters = () => {
    setFilterState({ keyword: "", salaryRange: [0, 999] });
    dispatch(setFilterQuery(""));
    dispatch(setFilterSalary([0, 999]));
    dispatch(
      setPaginationData({
        ...paginationData,
        page: DEFAULT_PAGE_NUMBER,
        limit: DEFAULT_PAGE_LIMIT,
      })
    );
  };

  return (
    <aside>
      <section className="flex flex-col gap-2 px-4 2xl:px-0 ">
        <div className="w-full xl:w-52 ">
          <div className="flex justify-between py-4 px-2 border-b-2">
            <p className="text-gray-500 dark:text-white">Advance Filter</p>
            <button
              onClick={resetFilters}
              className=" px-3 rounded-md text-white hover:scale-105 bg-zinc-700 transition"
            >
              Reset
            </button>
          </div>
        </div>

        {/* POPULAR KEYWORD */}
        <div className="flex flex-col gap-2 ">
          <h3 className="font-bold text-lg xl:text-xl text-gray-700 dark:text-white">
            Popular keyword
          </h3>
          <form className="flex xl:flex-col gap-x-4 gap-y-2 xl:gap-3 flex-wrap">
            {["", "software", "developer", "web", "AI"].map((keyword) => (
              <div
                className="flex gap-2 items-center xl:grid xl:grid-cols-2 xl:gap-0 "
                key={keyword}
              >
                <label className="max-sm:text-sm text-gray-700 dark:text-white font-medium">
                  {keyword || "All"}
                </label>
                <input
                  type="radio"
                  name="popular-keyword"
                  value={keyword}
                  checked={filterState.keyword === keyword}
                  onChange={handlePopKeyChange}
                  className="size-4 xl:size-6 xl:mx-auto"
                />
              </div>
            ))}
          </form>
        </div>

        {/* SALARY RANGE */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg xl:text-xl text-gray-700 dark:text-white ">
            Salary Range
          </h3>
          <form className="flex xl:flex-col gap-x-4 gap-y-2 xl:gap-3 flex-wrap">
            {["0-999", "0-10", "10-30", "30-40"].map((range) => (
              <div
                className="flex gap-1 items-center xl:grid xl:grid-cols-2"
                key={range}
              >
                <label className="max-sm:text-sm text-gray-700 dark:text-white font-medium">
                  {range === "0-999" ? "All" : range.replace("-", "-") + " LPA"}
                </label>

                <input
                  type="radio"
                  name="salary-range"
                  value={range}
                  checked={filterState.salaryRange.join("-") === range}
                  onChange={handleSalaryRange}
                  className="size-4 xl:size-6 xl:mx-auto"
                />
              </div>
            ))}
          </form>
        </div>
      </section>
    </aside>
  );
};
