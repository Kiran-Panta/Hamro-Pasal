import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartData } from "@/context/CartContext";
import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Payment = () => {
  const { cart, subTotal, fetchCart } = CartData();

  const [address, setAddress] = useState("");
  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // ============================================
  // FETCH SELECTED ADDRESS
  // ============================================

  async function fetchAddress() {
    try {
      const { data } = await axios.get(
        `${server}/api/address/${id}`,
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );

      setAddress(data);
    } catch (error) {
      console.error("Address fetch error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load address"
      );
    }
  }

  useEffect(() => {
    fetchAddress();
  }, [id]);

  // ============================================
  // PAYMENT HANDLER
  // ============================================

  const paymentHandler = async () => {
    // --------------------------------------------
    // VALIDATION
    // --------------------------------------------

    if (!method) {
      toast.error("Please select a payment method");
      return;
    }

    if (!address) {
      toast.error("Please select a delivery address");
      return;
    }

    setLoading(true);

    try {
      // ==========================================
      // COD
      // ==========================================

      if (method === "cod") {
        const { data } = await axios.post(
          `${server}/api/order/new/cod`,
          {
            method: "cod",
            phone: address.phone,
            address: address.address,
          },
          {
            headers: {
              token: Cookies.get("token"),
            },
          }
        );

        toast.success(data.message);

        await fetchCart();

        navigate("/orders");

        return;
      }

      // ==========================================
      // ESEWA ONLINE PAYMENT
      // ==========================================

      if (method === "online") {
        console.log(
          "=========================================="
        );

        console.log(
          "STARTING ESEWA PAYMENT"
        );

        console.log(
          "=========================================="
        );

        // ----------------------------------------
        // 1. ASK BACKEND TO CREATE PAYMENT
        // ----------------------------------------

        const { data } = await axios.post(
          `${server}/api/order/new/online`,
          {
            method: "online",
            phone: address.phone,
            address: address.address,
          },
          {
            headers: {
              token: Cookies.get("token"),
            },
          }
        );

        // ----------------------------------------
        // 2. CHECK BACKEND RESPONSE
        // ----------------------------------------

        console.log(
          "========== FRONTEND ESEWA DATA =========="
        );

        console.log(
          "Backend response:",
          data
        );

        console.log(
          "Payment data:",
          data.paymentData
        );

        console.log(
          "=========================================="
        );

        if (
          !data.success ||
          !data.paymentData
        ) {
          throw new Error(
            "Unable to initialize eSewa payment"
          );
        }

        const paymentData =
          data.paymentData;

        // ----------------------------------------
        // 3. PRINT EVERY FIELD
        // ----------------------------------------

        console.log(
          "========== ESEWA FORM FIELDS =========="
        );

        Object.entries(paymentData).forEach(
          ([key, value]) => {
            console.log(
              `eSewa field: ${key} = ${value}`
            );
          }
        );

        console.log(
          "========================================"
        );

        // ----------------------------------------
        // 4. CREATE FORM
        // ----------------------------------------

        const form =
          document.createElement("form");

        form.method = "POST";

        form.action =
          "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

        form.style.display = "none";

        // ----------------------------------------
        // 5. ADD PAYMENT FIELDS
        // ----------------------------------------

        Object.entries(paymentData).forEach(
          ([key, value]) => {
            const input =
              document.createElement("input");

            input.type = "hidden";

            input.name = key;

            input.value = String(value);

            form.appendChild(input);
          }
        );

        // ----------------------------------------
        // 6. ADD FORM TO PAGE
        // ----------------------------------------

        document.body.appendChild(form);

        console.log(
          "eSewa form created successfully"
        );

        console.log(
          "Submitting form to eSewa..."
        );

        console.log(
          "eSewa URL:",
          form.action
        );

        // ----------------------------------------
        // 7. SUBMIT TO ESEWA
        // ----------------------------------------

        form.submit();

        return;
      }
    } catch (error) {
      console.error(
        "=========================================="
      );

      console.error(
        "ESEWA PAYMENT ERROR"
      );

      console.error(
        error
      );

      console.error(
        "=========================================="
      );

      setLoading(false);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Payment failed. Please try again"
      );
    }
  };

  // ============================================
  // UI
  // ============================================

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0b0f] py-10 px-4">

      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-5xl mx-auto space-y-8">

          {/* HEADER */}

          <div className="text-center">

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Checkout
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Review your order and complete payment
            </p>

          </div>

          {/* PRODUCTS */}

          <div className="bg-white dark:bg-[#111216] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">

            <h3 className="text-lg font-semibold mb-4">
              Products
            </h3>

            <Separator className="mb-4" />

            <div className="space-y-4">

              {cart &&
                cart.map((e, i) => (

                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-sm transition"
                  >

                    <img
                      src={
                        e.product?.images?.[0]?.url
                      }
                      alt="product"
                      className="w-16 h-16 object-cover rounded-lg"
                    />

                    <div className="flex-1">

                      <h2 className="font-medium text-gray-900 dark:text-white">
                        {e.product?.title}
                      </h2>

                      <p className="text-sm text-gray-500">
                        Rs {e.product?.price} ×{" "}
                        {e.quauntity}
                      </p>

                    </div>

                    <p className="font-semibold text-gray-900 dark:text-white">
                      Rs{" "}
                      {Number(
                        e.product?.price || 0
                      ) *
                        Number(
                          e.quauntity || 0
                        )}
                    </p>

                  </div>

                ))}

            </div>

          </div>

          {/* TOTAL */}

          <div className="text-center">

            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              Total: Rs {subTotal}
            </p>

          </div>

          {/* ADDRESS + PAYMENT */}

          {address && (

            <div className="grid md:grid-cols-2 gap-6">

              {/* ADDRESS */}

              <div className="bg-white dark:bg-[#111216] border border-gray-100 dark:border-gray-800 rounded-2xl p-6">

                <h3 className="text-lg font-semibold mb-3">
                  Delivery Address
                </h3>

                <Separator className="mb-4" />

                <p className="text-sm text-gray-600 dark:text-gray-300">

                  <span className="font-medium">
                    Address:
                  </span>{" "}

                  {address.address}

                </p>

                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">

                  <span className="font-medium">
                    Phone:
                  </span>{" "}

                  {address.phone}

                </p>

              </div>

              {/* PAYMENT */}

              <div className="bg-white dark:bg-[#111216] border border-gray-100 dark:border-gray-800 rounded-2xl p-6">

                <h3 className="text-lg font-semibold mb-3">
                  Payment Method
                </h3>

                <Separator className="mb-4" />

                <select
                  value={method}
                  onChange={(e) =>
                    setMethod(
                      e.target.value
                    )
                  }
                  className="w-full p-3 rounded-lg border bg-transparent dark:bg-[#0f1115] text-gray-900 dark:text-white"
                >

                  <option value="">
                    Select Method
                  </option>

                  <option value="cod">
                    Cash on Delivery
                  </option>

                  <option value="online">
                    Online Payment
                  </option>

                </select>

              </div>

            </div>

          )}

          {/* BUTTON */}

          <Button
            className="w-full py-3 text-lg rounded-xl"
            onClick={paymentHandler}
            disabled={
              !method ||
              !address ||
              loading
            }
          >
            {method === "online"
              ? "Pay with eSewa"
              : "Proceed to Checkout"}
          </Button>

        </div>
      )}

    </div>
  );
};

export default Payment;
