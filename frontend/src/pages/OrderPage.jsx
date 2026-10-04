import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserData } from "@/context/UserContext";
import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  Clock3,
  CreditCard,
  MapPin,
  Package,
  Phone,
  Printer,
  ShoppingBag,
  Truck,
  User,
  XCircle,
} from "lucide-react";

const OrderPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  const { user } = UserData();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`${server}/api/order/${id}`, {
          headers: {
            token: Cookies.get("token"),
          },
        });

        setOrder(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const cancelOrder = async () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmCancel) return;

    try {
      setCancelling(true);

      const { data } = await axios.put(
        `${server}/api/order/${id}/cancel`,
        {},
        {
          headers: {
            token: Cookies.get("token"),
          },
        },
      );

      setOrder(data.order);
      alert(data.message);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) return <Loading />;

  if (!order) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-5">
          <Package className="w-10 h-10 text-red-500" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Order Not Found
        </h1>

        <p className="mt-2 text-muted-foreground">
          We couldn't find an order with this ID.
        </p>

        <Button
          className="mt-6 rounded-xl px-6"
          onClick={() => navigate("/products")}
        >
          Shop Now
        </Button>
      </div>
    );
  }

  const isOwner = user?._id === order.user?._id || user?.role === "admin";

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

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;
  const progress = getProgress(order.status);

  return (
    <div className="min-h-screen bg-[#f1f3f6] dark:bg-[#0d0e10]">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:py-10">
        {isOwner ? (
          <>
            {/* TOP BAR */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <Button
                variant="ghost"
                className="w-fit rounded-xl px-3"
                onClick={() => navigate("/orders")}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Orders
              </Button>

              <Button
                variant="outline"
                className="w-fit rounded-xl"
                onClick={() => window.print()}
              >
                <Printer className="w-4 h-4 mr-2" />
                Print Order
              </Button>
            </div>

            {/* ORDER HEADER */}
            <Card className="mb-6 overflow-hidden rounded-3xl border-border/50 bg-background/90 backdrop-blur-sm shadow-lg">
              <CardHeader className="p-6 md:p-8 border-b border-border/50">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Order Details
                    </p>

                    <CardTitle className="text-xl md:text-2xl font-bold break-all">
                      #{order._id.toUpperCase()}
                    </CardTitle>
                  </div>

                  {/* <div
                    className={`inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full border font-semibold text-sm ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                  >
                    <StatusIcon className="w-4 h-4" />
                    {order.status}
                  </div> */}

                  <div className="flex flex-wrap items-center gap-3">
                    <div
                      className={`inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full border font-semibold text-sm ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                    >
                      <StatusIcon className="w-4 h-4" />
                      {order.status}
                    </div>

                    {order.status === "Pending" && user?.role !== "admin" && (
                      <Button
                        variant="destructive"
                        className="rounded-xl"
                        onClick={cancelOrder}
                        disabled={cancelling}
                      >
                        <XCircle className="w-4 h-4 mr-2" />

                        {cancelling ? "Cancelling..." : "Cancel Order"}
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 md:p-8">
                {/* ORDER PROGRESS */}
                {order.status !== "Cancelled" ? (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-semibold text-lg">Order Progress</h2>

                      <span className="text-sm text-muted-foreground">
                        {order.status}
                      </span>
                    </div>

                    <div className="relative px-2">
                      {/* Line */}
                      <div className="absolute left-[8%] right-[8%] top-4 h-1 bg-muted rounded-full" />

                      {/* Active Line */}
                      <div
                        className={`absolute left-[8%] top-4 h-1 rounded-full transition-all duration-500 ${
                          progress === 3 ? "bg-green-500" : "bg-blue-600"
                        }`}
                        style={{
                          width:
                            progress === 1
                              ? "0%"
                              : progress === 2
                                ? "42%"
                                : "84%",
                        }}
                      />

                      <div className="relative flex justify-between">
                        {/* Pending */}
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-background ${
                              progress >= 1
                                ? "bg-blue-600 text-white"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <Clock3 className="w-3.5 h-3.5" />
                          </div>

                          <span className="mt-2 text-xs sm:text-sm font-medium">
                            Pending
                          </span>
                        </div>

                        {/* Shipped */}
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-background ${
                              progress >= 2
                                ? "bg-blue-600 text-white"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <Truck className="w-3.5 h-3.5" />
                          </div>

                          <span className="mt-2 text-xs sm:text-sm font-medium">
                            Shipped
                          </span>
                        </div>

                        {/* Delivered */}
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-background ${
                              progress >= 3
                                ? "bg-green-500 text-white"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>

                          <span className="mt-2 text-xs sm:text-sm font-medium">
                            Delivered
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-8 rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-900/10 p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-red-700 dark:text-red-300">
                          Order Cancelled
                        </h3>

                        <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-1">
                          This order has been cancelled.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ORDER INFORMATION */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="rounded-2xl bg-muted/40 p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Package className="w-4 h-4" />
                      <span className="text-sm">Total Items</span>
                    </div>

                    <p className="text-lg font-bold">{order.items.length}</p>
                  </div>

                  <div className="rounded-2xl bg-muted/40 p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <CreditCard className="w-4 h-4" />
                      <span className="text-sm">Payment Method</span>
                    </div>

                    <p className="text-lg font-bold uppercase">
                      {order.method === "online" ? "eSewa" : "COD"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-muted/40 p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <ShoppingBag className="w-4 h-4" />
                      <span className="text-sm">Subtotal</span>
                    </div>

                    <p className="text-lg font-bold">Rs {order.subTotal}</p>
                  </div>

                  <div className="rounded-2xl bg-muted/40 p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <CalendarDays className="w-4 h-4" />
                      <span className="text-sm">Placed At</span>
                    </div>

                    <p className="text-lg font-bold">
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SHIPPING + PAYMENT */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* SHIPPING */}
              <Card className="rounded-3xl border-border/50 bg-background/90 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Shipping Details
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="font-medium mt-1">{order.phone}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Delivery Address
                      </p>
                      <p className="font-medium mt-1">{order.address}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Customer</p>
                      <p className="font-medium mt-1 break-all">
                        {order.user?.email || "Guest"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* PAYMENT */}
              <Card className="rounded-3xl border-border/50 bg-background/90 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    Payment Information
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/40">
                    <span className="text-muted-foreground">Method</span>

                    <span className="font-semibold">
                      {order.method === "online" ? "eSewa" : "Cash on Delivery"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/40">
                    <span className="text-muted-foreground">Amount</span>

                    <span className="font-bold">Rs {order.subTotal}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/40">
                    <span className="text-muted-foreground">Paid At</span>

                    <span className="font-medium text-right">
                      {order.paidAt
                        ? new Date(order.paidAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "Payment Through COD"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* PRODUCTS */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-2xl font-bold">Ordered Products</h2>

                  <p className="text-sm text-muted-foreground mt-1">
                    Products included in this order
                  </p>
                </div>

                <span className="text-sm text-muted-foreground">
                  {order.items.length}{" "}
                  {order.items.length === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {order.items.map((e, i) => (
                  <Card
                    key={i}
                    className="group overflow-hidden rounded-3xl border-border/50 bg-background shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <Link to={`/product/${e.product._id}`}>
                      <div className="h-64 bg-muted/30 overflow-hidden">
                        <img
                          src={e.product.images[0]?.url}
                          alt={e.product.title}
                          className="w-full h-full object-contain p-5 transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    </Link>

                    <CardContent className="p-5">
                      <h3 className="font-bold text-lg line-clamp-2 min-h-[56px]">
                        {e.product.title}
                      </h3>

                      <div className="mt-4 space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">
                            Quantity
                          </span>

                          <span className="font-semibold px-2.5 py-1 rounded-lg bg-muted">
                            {e.quantity}
                          </span>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-border/50">
                          <span className="text-muted-foreground">Price</span>

                          <span className="font-bold text-lg">
                            Rs {e.product.price}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-5">
              <XCircle className="w-10 h-10 text-red-500" />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold">
              This is not your order
            </h1>

            <p className="mt-2 text-muted-foreground">
              You don't have permission to view this order.
            </p>

            <Link
              to="/"
              className="mt-5 text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Go to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
