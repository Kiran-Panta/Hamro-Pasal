import React, { useEffect, useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { server } from "@/main";
import Loading from "@/components/Loading";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const encodedData =
          searchParams.get("data");

        if (!encodedData) {
          toast.error(
            "Payment information not found"
          );

          navigate("/orders");
          return;
        }

        /*
         * eSewa sends the response as Base64.
         */
        const decodedString = atob(encodedData);

        const decodedData =
          JSON.parse(decodedString);

        console.log(
          "eSewa response:",
          decodedData
        );

        /*
         * Basic validation before sending
         * anything to our backend.
         */
        if (
          !decodedData.transaction_uuid ||
          !decodedData.signature ||
          !decodedData.signed_field_names
        ) {
          throw new Error(
            "Invalid eSewa payment response"
          );
        }

        /*
         * Send the response to our backend.
         *
         * Backend performs the actual security
         * verification.
         */
        const { data } = await axios.post(
          `${server}/api/order/verify/esewa`,
          decodedData,
          {
            headers: {
              token: Cookies.get("token"),
            },
          }
        );

        if (data.success) {
          toast.success(
            "Payment successful!"
          );

          navigate("/orders");
          return;
        }

        throw new Error(
          data.message ||
            "Payment verification failed"
        );
      } catch (error) {
        console.error(
          "Payment verification error:",
          error
        );

        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Payment verification failed"
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
