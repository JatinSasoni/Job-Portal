/* eslint-disable react/prop-types */
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setPaginationData } from "../../../store/jobSlice";
import { motion } from "framer-motion";

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

    if (newPage >= 1 && newPage <= paginationData?.totalPage) {
      dispatch(setPaginationData({ scope, data: { page: newPage } }));
    }
  };

  return (
    <div className="w-full grid place-items-center py-6">
      <div className="flex items-center gap-4">
        {/* Previous Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={paginationData?.page <= 1}
          onClick={() => handlePageSelection("prev")}
          className={`px-6 py-2 bg-blue-400 rounded-lg text-white font-semibold transition-all duration-300 ${
            paginationData?.page <= 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-500"
          }`}
        >
          Prev
        </motion.button>

        {/* Page Numbers */}
        <div className="flex gap-2">
          {[...Array(paginationData?.totalPage || 0)].map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (paginationData?.page !== index + 1) {
                  dispatch(
                    setPaginationData({ scope, data: { page: index + 1 } })
                  );
                }
              }}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                index + 1 === paginationData?.page
                  ? "bg-blue-500 text-white scale-110"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              {index + 1}
            </motion.button>
          ))}
        </div>

        {/* Next Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={paginationData?.page >= paginationData?.totalPage}
          onClick={() => handlePageSelection("next")}
          className={`px-6 py-2 bg-blue-400 rounded-lg text-white font-semibold transition-all duration-300 ${
            paginationData?.page >= paginationData?.totalPage
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-500"
          }`}
        >
          Next
        </motion.button>
      </div>
    </div>
  );
};

export default Pagination;
