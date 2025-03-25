import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../Components/Shared/Navbar";
import { useNavigate } from "react-router-dom";
import { setLoggedInUser } from "../../store/authSlice";

const MakePayment = () => {
  const { loggedInUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMakePayment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/user/subscribe",
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
        callback_url: "http://localhost:8000/api/v1/user/pay-verify",
        prefill: {
          name: loggedInUser?.username || "User",
          email: loggedInUser?.email || "example@gmail.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
        handler: async function (paymentResponse) {
          console.log("Payment Success:", paymentResponse);
          alert("Payment Successful!");

          // VERIFY PAYMENT ON BACKEND
          const verifyResponse = await axios.post(
            "http://localhost:8000/api/v1/user/pay-verify",
            paymentResponse,
            { withCredentials: true }
          );

          if (verifyResponse.status === 200) {
            dispatch(setLoggedInUser(verifyResponse.data.userData)); // Update Redux store
            navigate("/admin/payment-success"); // Navigate to success page
          } else {
            alert("Payment verification failed.");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert(
        error.response?.data?.MESSAGE || "An error occurred. Please try again."
      );
    }
  };

  return (
    <section>
      <Navbar />
      <form action="">
        <button
          className="p-2 bg-blue-400 text-white hover:scale-105 duration-200"
          onClick={handleMakePayment}
        >
          Make Payment
        </button>
      </form>
    </section>
  );
};

export default MakePayment;
