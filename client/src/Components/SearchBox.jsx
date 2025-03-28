import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../store/jobSlice";
import { useNavigate } from "react-router-dom";

export const SearchBox = () => {
  const { searchedQuery } = useSelector((store) => store.job);
  const [search, setSearch] = useState({
    keyword: searchedQuery?.keyword || "",
    city: searchedQuery?.city || "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handleSearchLogic
  const handleSearchLogic = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(search));
    navigate("/browse");
  };

  const handleSearchChange = (e) => {
    setSearch((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className=" my-3 w-full p-1 mx-auto rounded-2xl bg-white drop-shadow-lg shadow-black relative z-0 dark:text-black  dark:bg-zinc-700">
      <form
        autoComplete="off"
        onSubmit={handleSearchLogic}
        className="grid grid-cols-3  [&>input]:text-xs md:[&>input]:text-lg [&>input]:p-1 sm:[&>input]:p-2 [&>*]:outline-none [&>input]:dark:bg-transparent  [&>input]:outline-none [&>input]:dark:text-white [&>input]:dark:placeholder:text-gray-100"
      >
        <input
          type="text"
          placeholder="Enter Keyword...."
          name="keyword"
          value={search.keyword}
          onChange={handleSearchChange}
        />
        <input
          type="text"
          placeholder="Enter City...."
          name="city"
          value={search.city}
          onChange={handleSearchChange}
        />
        {/* <input type="text" placeholder="Enter something..." /> */}
        <div className="grid place-items-center">
          <button className="bg-blue-400 text-sm lg:text-lg text-white size-full rounded-2xl transition-all dark:bg-blue-400 dark:hover:bg-blue-500 ">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};
