import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../Components/Shared/Navbar";
import { useNavigate } from "react-router-dom";
import { setLoading, setLoggedInUser } from "../../store/authSlice";
import { FaCheckCircle, FaShieldAlt } from "react-icons/fa";
import { MdWorkspacePremium } from "react-icons/md";
import { FaRocket } from "react-icons/fa6";
import { useEffect, useRef } from "react";

const MakePayment = () => {
  const { loggedInUser, loading } = useSelector((store) => store.auth);
  const isVerifyingPaymentRef = useRef(false); // Prevents unwanted re-renders
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMakePayment = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${import.meta.env.VITE_API_URI}/api/v1/user/subscribe`,
        { withCredentials: true }
      );

      if (response.status !== 201 || !response.data.subscriptionID) {
        throw new Error("Failed to fetch subscription details");
      }

      const options = {
        key: import.meta.env.VITE_RAZOR_PAY_KEY,
        subscription_id: response.data.subscriptionID,
        name: "Talent Nest",
        description: "Subscription Plan",
        callback_url: `${import.meta.env.VITE_API_URI}/api/v1/user/pay-verify`,
        prefill: {
          name: loggedInUser?.username || "User",
          email: loggedInUser?.email || "example@gmail.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
        handler: async function (paymentResponse) {
          isVerifyingPaymentRef.current = true; // Prevent useEffect from triggering

          // VERIFY PAYMENT ON BACKEND
          const verifyResponse = await axios.post(
            `${import.meta.env.VITE_API_URI}/api/v1/user/pay-verify`,
            paymentResponse,
            { withCredentials: true }
          );

          if (verifyResponse.status === 200) {
            dispatch(setLoggedInUser(verifyResponse?.data?.userData)); // Update Redux store
            navigate(
              `/admin/payment-success?reference=${paymentResponse.razorpay_payment_id}`
            );
          } else {
            alert("Payment verification failed.");
          }
          isVerifyingPaymentRef.current = false; // Allow useEffect to work again
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert(
        error.response?.data?.MESSAGE || "An error occurred. Please try again."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    const currentPath = window.location.pathname; // Get current page URL

    if (
      currentPath !== "/admin/payment-success" && // Prevent redirect from success page
      !isVerifyingPaymentRef.current &&
      (!loggedInUser ||
        loggedInUser?.role !== "recruiter" ||
        loggedInUser?.subscription?.status === "active")
    ) {
      navigate("/admin/companies");
    }
  }, [loggedInUser, navigate]);

  return (
    <>
      {/* NAV COMPONENT */}
      <Navbar />

      <section className="min-h-[calc(100vh-112px)] bg-gradient-to-br flex items-center justify-center p-6">
        <div className="max-w-5xl w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Premium Card - Now more prominent */}
          <div className="relative bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl overflow-hidden w-full max-w-md transition-all hover:shadow-2xl hover:-translate-y-1">
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

            <div className="p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-4">
                <MdWorkspacePremium className="text-3xl text-blue-600 dark:text-blue-400" />
              </div>

              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Premium Plan
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Unlock exclusive features and elevate your experience
              </p>

              <div className="mb-8">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  ₹{import.meta.env.VITE_SUBSCRIPTION_PRICE}
                </span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>

              <button
                onClick={handleMakePayment}
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 "
              >
                <MdWorkspacePremium className="text-xl" />
                {loading ? (
                  <div className="animate-spin h-5 w-5 border-4 border-blue-100 border-t-transparent rounded-full mx-auto"></div>
                ) : (
                  "Subscribe Now"
                )}
              </button>
            </div>

            <div className="border-t border-gray-200 dark:border-zinc-700 px-8 py-6 bg-gray-50 dark:bg-zinc-700/20">
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FaCheckCircle className="text-green-500 flex-shrink-0" />
                  <span>Featured Job Post</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FaCheckCircle className="text-green-500 flex-shrink-0" />
                  <span>No Ads Experience</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FaCheckCircle className="text-green-500 flex-shrink-0" />
                  <span>Featured Company Profile</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FaCheckCircle className="text-green-500 flex-shrink-0" />
                  <span>Priority Support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Logo Section */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-56 h-56 rounded-full bg-white  p-4 shadow-xl border-2 border-blue-100 dark:border-zinc-700">
              <div className="absolute inset-0 rounded-full border-8  border-opacity-10 border-blue-500 animate-pulse"></div>
              <img
                src="/Logo/newlogo.png"
                alt="Company Logo"
                className="w-full h-full object-contain "
              />
            </div>

            <h3 className="mt-8 text-2xl font-bold text-gray-800 dark:text-white">
              Why Go Premium?
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md">
              Join thousands of satisfied users who unlocked the full potential
              of our platform with Premium.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4">
              <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-transparent rounded-lg backdrop-blur-sm">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
                  <FaRocket className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">
                    Boost Visibility
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Get your profile seen by more potential matches
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-transparent rounded-lg backdrop-blur-sm">
                <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-full">
                  <FaShieldAlt className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">
                    Ad-Free Experience
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Enjoy our platform without any distractions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MakePayment;
