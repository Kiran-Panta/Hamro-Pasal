// import Loading from "@/components/Loading";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { server } from "@/main";
// import axios from "axios";
// import Cookies from "js-cookie";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const { data } = await axios.get(`${server}/api/order/all`, {
//           headers: {
//             token: Cookies.get("token"),
//           },
//         });

//         setOrders(data.orders);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   console.log(orders);

//   if (loading) {
//     return <Loading />;
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
//         <h1 className="text-2xl font-bold text-gray-600">No Orders Yet</h1>
//         <Button onClick={() => navigate("/products")}>Shop Now</Button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-6 px-4 min-h-[70vh]">
//       <div className="text-3xl font-bold mb-6 text-center">Your Orders</div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {orders.map((order) => {
//           return (
//             <Card
//               key={order._id}
//               className="shadow-sm hover:shadow-lg transition-shadow duration-200"
//             >
//               <CardHeader>
//                 <CardTitle className="text-xl font-semibold">
//                   Order #{order._id.toUpperCase()}
//                 </CardTitle>
//               </CardHeader>

//               <CardContent>
//                 <p>
//                   <strong>Status: </strong>
//                   <span
//                     className={`${
//                       order.status === "Pending"
//                         ? "text-yellow-500"
//                         : "text-green-500"
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </p>
//                 <p>
//                   <strong>Total Items: </strong>

//                   {order.items.length}
//                 </p>
//                 <p>
//                   <strong>SubTotal: </strong>

//                   {order.subTotal}
//                 </p>
//                 <p>
//                   <strong>Placed At: </strong>

//                   {new Date(order.createdAt).toLocaleDateString()}
//                 </p>

//                 <Button
//                   className="mt-4"
//                   onClick={() => navigate(`/order/${order._id}`)}
//                 >
//                   View Details
//                 </Button>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Orders;







import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  Package,
  ShoppingBag,
  Truck,
  CheckCircle2,
  XCircle,
  CreditCard,
} from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${server}/api/order/all`, {
          headers: {
            token: Cookies.get("token"),
          },
        });

        setOrders(data.orders);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  console.log(orders);

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-5">
          <ShoppingBag className="w-10 h-10 text-blue-600 dark:text-blue-400" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          No Orders Yet
        </h1>

        <p className="mt-2 text-muted-foreground max-w-md">
          You haven't placed any orders yet. Start shopping and your orders
          will appear here.
        </p>

        <Button
          onClick={() => navigate("/products")}
          className="mt-6 rounded-xl px-6"
        >
          Start Shopping
        </Button>
      </div>
    );
  }

  const getStatusConfig = (status) => {
    switch (status) {
      case "Pending":
        return {
          icon: Clock3,
          text: "text-yellow-700 dark:text-yellow-300",
          bg: "bg-yellow-100 dark:bg-yellow-900/20",
          border: "border-yellow-200 dark:border-yellow-800/40",
        };

      case "Paid":
        return {
          icon: CreditCard,
          text: "text-green-700 dark:text-green-300",
          bg: "bg-green-100 dark:bg-green-900/20",
          border: "border-green-200 dark:border-green-800/40",
        };

      case "Processing":
        return {
          icon: Package,
          text: "text-purple-700 dark:text-purple-300",
          bg: "bg-purple-100 dark:bg-purple-900/20",
          border: "border-purple-200 dark:border-purple-800/40",
        };

      case "Shipped":
        return {
          icon: Truck,
          text: "text-blue-700 dark:text-blue-300",
          bg: "bg-blue-100 dark:bg-blue-900/20",
          border: "border-blue-200 dark:border-blue-800/40",
        };

      case "Delivered":
        return {
          icon: CheckCircle2,
          text: "text-green-700 dark:text-green-300",
          bg: "bg-green-100 dark:bg-green-900/20",
          border: "border-green-200 dark:border-green-800/40",
        };

      case "Cancelled":
        return {
          icon: XCircle,
          text: "text-red-700 dark:text-red-300",
          bg: "bg-red-100 dark:bg-red-900/20",
          border: "border-red-200 dark:border-red-800/40",
        };

      default:
        return {
          icon: Clock3,
          text: "text-gray-700 dark:text-gray-300",
          bg: "bg-gray-100 dark:bg-gray-900/20",
          border: "border-gray-200 dark:border-gray-800/40",
        };
    }
  };

  const getProgress = (status) => {
    if (status === "Cancelled") return 0;
    if (status === "Delivered") return 3;
    if (status === "Shipped") return 2;

    return 1;
  };

  return (
    <div className="min-h-[70vh] bg-[#f1f3f6] dark:bg-[#0d0e10]">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Your Orders
              </h1>

              <p className="text-sm text-muted-foreground mt-1">
                Track and manage your recent purchases
              </p>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {orders.map((order) => {
            const statusConfig = getStatusConfig(order.status);
            const StatusIcon = statusConfig.icon;
            const progress = getProgress(order.status);

            return (
              <Card
                key={order._id}
                className="group overflow-hidden border-border/60 bg-background/90 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card Header */}
                <CardHeader className="pb-4 border-b border-border/50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">
                        Order ID
                      </p>

                      <CardTitle className="text-base md:text-lg font-bold truncate">
                        #{order._id.toUpperCase()}
                      </CardTitle>
                    </div>

                    {/* Status Badge */}
                    <div
                      className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                    >
                      <StatusIcon className="w-3.5 h-3.5" />
                      {order.status}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-5">
                  {/* Order Information */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="rounded-xl bg-muted/40 p-3">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Package className="w-4 h-4" />
                        <span className="text-xs">Items</span>
                      </div>

                      <p className="font-semibold">
                        {order.items.length}
                      </p>
                    </div>

                    <div className="rounded-xl bg-muted/40 p-3">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <CreditCard className="w-4 h-4" />
                        <span className="text-xs">Subtotal</span>
                      </div>

                      <p className="font-semibold">
                        Rs {order.subTotal}
                      </p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <CalendarDays className="w-4 h-4" />

                    <span>
                      Placed on{" "}
                      <span className="font-medium text-foreground">
                        {new Date(order.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </span>
                  </div>

                  {/* Order Progress */}
                  {order.status !== "Cancelled" && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span
                          className={
                            progress >= 1
                              ? "text-blue-600 dark:text-blue-400 font-medium"
                              : ""
                          }
                        >
                          Pending
                        </span>

                        <span
                          className={
                            progress >= 2
                              ? "text-blue-600 dark:text-blue-400 font-medium"
                              : ""
                          }
                        >
                          Shipped
                        </span>

                        <span
                          className={
                            progress >= 3
                              ? "text-green-600 dark:text-green-400 font-medium"
                              : ""
                          }
                        >
                          Delivered
                        </span>
                      </div>

                      <div className="relative h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${
                            progress === 3
                              ? "bg-green-500"
                              : "bg-blue-600"
                          }`}
                          style={{
                            width:
                              progress === 1
                                ? "0%"
                                : progress === 2
                                ? "50%"
                                : "100%",
                          }}
                        />
                      </div>

                      <div className="flex justify-between -mt-[7px] relative">
                        <span
                          className={`w-4 h-4 rounded-full border-2 border-background ${
                            progress >= 1
                              ? "bg-blue-600"
                              : "bg-muted"
                          }`}
                        />

                        <span
                          className={`w-4 h-4 rounded-full border-2 border-background ${
                            progress >= 2
                              ? "bg-blue-600"
                              : "bg-muted"
                          }`}
                        />

                        <span
                          className={`w-4 h-4 rounded-full border-2 border-background ${
                            progress >= 3
                              ? "bg-green-500"
                              : "bg-muted"
                          }`}
                        />
                      </div>
                    </div>
                  )}

                  {/* Cancelled */}
                  {order.status === "Cancelled" && (
                    <div className="mb-6 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-900/10 p-3">
                      <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                        <XCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          This order has been cancelled
                        </span>
                      </div>
                    </div>
                  )}

                  {/* View Details */}
                  <Button
                    className="w-full rounded-xl group-hover:bg-blue-700 transition-colors"
                    onClick={() => navigate(`/order/${order._id}`)}
                  >
                    View Order Details
                    <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;