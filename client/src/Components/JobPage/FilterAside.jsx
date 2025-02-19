import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterQuery, setFilterSalary } from "../../../store/jobSlice";

export const FilterAside = () => {
  const dispatch = useDispatch();
  const { filterQuery, filterSalary } = useSelector((store) => store.job); // Get Redux values

  // Initialize local state with Redux values
  const [filterState, setFilterState] = useState({
    keyword: filterQuery || "", // Use Redux state if available
    salaryRange: filterSalary.length ? filterSalary : [0, 999],
  });

  // Sync local state with Redux state when Redux state changes
  useEffect(() => {
    setFilterState({
      keyword: filterQuery || "",
      salaryRange: filterSalary.length ? filterSalary : [0, 999],
    });
  }, [filterQuery, filterSalary]);

  const handlePopKeyChange = (e) => {
    const keyword = e.target.value;
    setFilterState((prev) => ({ ...prev, keyword }));
    dispatch(setFilterQuery(keyword));
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
  };

  return (
    <aside>
      <section className="flex flex-col gap-8">
        <div className="w-52">
          <div className="flex justify-between py-4 px-2 border-b-2">
            <p className="text-gray-500">Advance Filter</p>
            <button onClick={resetFilters}>Reset</button>
          </div>
        </div>

        {/* POPULAR KEYWORD */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-xl">Popular keyword</h3>
          <form className="flex flex-col gap-3">
            {["", "software", "developer", "web", "AI"].map((keyword) => (
              <div className="grid grid-cols-2" key={keyword}>
                <label>{keyword || "All"}</label>
                <input
                  type="radio"
                  name="popular-keyword"
                  value={keyword}
                  checked={filterState.keyword === keyword}
                  onChange={handlePopKeyChange}
                />
              </div>
            ))}
          </form>
        </div>

        {/* SALARY RANGE */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-xl">Salary Range</h3>
          <form className="flex flex-col gap-3">
            {["0-999", "0-10", "10-30", "30-40"].map((range) => (
              <div className="grid grid-cols-2" key={range}>
                <label>
                  {range === "0-999"
                    ? "All"
                    : range.replace("-", " - ") + " LPA"}
                </label>
                <input
                  type="radio"
                  name="salary-range"
                  value={range}
                  checked={filterState.salaryRange.join("-") === range}
                  onChange={handleSalaryRange}
                />
              </div>
            ))}
          </form>
        </div>
      </section>
    </aside>
  );
};
