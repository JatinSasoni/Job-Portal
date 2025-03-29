import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "../Components/Shared/Navbar";
import { motion } from "framer-motion";
import { FaCheckCircle, FaArrowRight, FaRegSmileBeam } from "react-icons/fa";
import { MdCelebration } from "react-icons/md";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Success = () => {
  const searchQuery = useSearchParams()[0];
  const referenceNum = searchQuery.get("reference");
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((store) => store.auth);

  useEffect(() => {
    if (!loggedInUser || loggedInUser.role !== "recruiter" || !referenceNum) {
      navigate("/admin/companies");
    }
  }, [loggedInUser, navigate, referenceNum]);

  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-112px)] flex flex-col ">
        <div className="flex-1 flex items-center justify-center p-4 pt-0">
          <div className="w-full max-w-2xl">
            <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl overflow-hidden">
              {/* Success Header */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 dark:to-400 p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.7 }}
                  className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm mb-3"
                >
                  <FaCheckCircle className="text-3xl text-white" />
                </motion.div>
                <h1 className="text-2xl font-bold text-white mb-1">
                  Payment Successful!
                </h1>
                <p className="text-white/90">Welcome to Premium Membership</p>
              </div>

              {/* Success Content - Compact layout */}
              <div className="p-6 space-y-4">
                <div className="flex flex-col items-center text-center">
                  <MdCelebration className="text-4xl text-yellow-500 mb-2" />
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    Thank You for Subscribing!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Your premium membership is now active.
                  </p>
                </div>

                {/* Compact Order Details */}
                <div className="bg-gray-50 dark:bg-zinc-600/20 rounded-lg p-4">
                  <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-1">
                    <FaRegSmileBeam className="text-blue-500 text-sm" />
                    <span>Order Details</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Transaction ID
                      </p>
                      <p className="font-medium text-gray-800 dark:text-white truncate">
                        {referenceNum ? referenceNum : "Not Provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Status
                      </p>
                      <p className="font-medium text-green-600 dark:text-green-400">
                        Active
                      </p>
                    </div>
                  </div>
                </div>

                {/* Compact Next Steps */}
                <div className="space-y-3">
                  <h3 className="text-md font-semibold text-gray-800 dark:text-white">
                    What's Next?
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="bg-blue-100 dark:bg-blue-900/50 p-1 rounded-full mt-0.5">
                        <FaCheckCircle className="text-blue-600 dark:text-blue-400 text-xs" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-800 dark:text-white">
                          Full premium access enabled
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="bg-blue-100 dark:bg-blue-900/50 p-1 rounded-full mt-0.5">
                        <FaCheckCircle className="text-blue-600 dark:text-blue-400 text-xs" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-800 dark:text-white">
                          Confirmation email sent
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Single CTA Button - Centered */}
                <div className="pt-4">
                  <button
                    onClick={() => navigate("/admin/companies")}
                    className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:shadow-md transition-all flex items-center justify-center gap-1"
                  >
                    Continue to Home <FaArrowRight className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
