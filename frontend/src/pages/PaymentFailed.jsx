import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0b0f] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-[#111216] rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-8 text-center">

        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-950/40 flex items-center justify-center">
            <XCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Payment Failed
        </h1>

        {/* MESSAGE */}
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Your eSewa payment could not be completed.
          No payment was successfully confirmed for this order.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col gap-3">

          <Button
            onClick={() => navigate("/cart")}
            className="w-full"
          >
            Return to Cart
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/orders")}
            className="w-full"
          >
            View My Orders
          </Button>

          <Link to="/" className="w-full">
            <Button
              variant="ghost"
              className="w-full"
            >
              Continue Shopping
            </Button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
