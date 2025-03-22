/* eslint-disable react/prop-types */
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setPaginationData } from "../../../store/jobSlice";

const Pagination = ({ scope }) => {
  const paginationData = useSelector(
    (store) => store.job.paginationData[scope],
    shallowEqual
  );

  const dispatch = useDispatch();

  const handlePageSelection = (type) => {
    const newPage =
      type.toLowerCase() === "prev"
        ? paginationData?.page - 1
        : paginationData?.page + 1;

    if (newPage >= 1 && newPage <= paginationData.totalPage) {
      dispatch(setPaginationData({ scope, data: { page: newPage } }));
    }
  };

  return (
    <div className="w-full grid place-items-center">
      <div className=" flex gap-6">
        <button
          disabled={paginationData?.page <= 1}
          onClick={() => handlePageSelection("prev")}
          className={`px-6 py-1 bg-blue-400 rounded-lg hover:bg-blue-500 duration-300 text-gray-50 ${
            paginationData?.page <= 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Prev
        </button>
        {[...Array(paginationData?.totalPage)].map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (paginationData?.page !== index + 1) {
                dispatch(
                  setPaginationData({ scope, data: { page: index + 1 } })
                );
              }
            }}
            className={`${
              index + 1 === paginationData?.page && "scale-125 text-blue-400"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={paginationData?.page >= paginationData?.totalPage}
          onClick={() => handlePageSelection("next")}
          className={`px-6 py-1 bg-blue-400 rounded-lg hover:bg-blue-500 duration-300 text-gray-50 ${
            paginationData?.page >= paginationData?.totalPage
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
