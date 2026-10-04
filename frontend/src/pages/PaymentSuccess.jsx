import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { server } from "@/main";
import Loading from "@/components/Loading";
import { CartData } from "@/context/CartContext";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { fetchCart } = CartData();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const encodedData = searchParams.get("data");

        console.log("========== ESEWA SUCCESS ==========");

        console.log("Encoded data:", encodedData);

        if (!encodedData) {
          throw new Error("Payment information not found");
        }

        /*
         * Decode eSewa Base64 response
         */
        const decodedString = atob(encodedData);

        console.log("Decoded string:", decodedString);

        const decodedData = JSON.parse(decodedString);

        console.log("Decoded eSewa response:", decodedData);

        /*
         * Validate required fields
         */
        if (
          !decodedData.transaction_uuid ||
          !decodedData.signature ||
          !decodedData.signed_field_names
        ) {
          throw new Error("Invalid eSewa payment response");
        }

        /*
         * Send eSewa response to backend.
         *
         * Backend performs the actual
         * payment verification.
         */
        const { data } = await axios.post(
          `${server}/api/order/verify/esewa`,
          decodedData,
          {
            headers: {
              token: Cookies.get("token"),
            },
          },
        );

        console.log("Backend verification response:", data);

        if (!data.success) {
          throw new Error(data.message || "Payment verification failed");
        }

        /*
         * Payment verified successfully.
         *
         * Backend has already:
         *
         * 1. Marked order as Paid
         * 2. Reduced stock
         * 3. Cleared cart
         * 4. Sent confirmation email
         */

        // Refresh cart state in React
        await fetchCart();

        toast.success("Payment successful!");

        navigate("/orders");
      } catch (error) {
        console.error("========== ESEWA VERIFICATION ERROR ==========");

        console.error(error);

        console.error("Backend response:", error.response?.data);

        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Payment verification failed",
        );

        navigate("/orders");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [navigate, searchParams]);

  if (loading) {
    return <Loading />;
  }

  return null;
};

export default PaymentSuccess;
