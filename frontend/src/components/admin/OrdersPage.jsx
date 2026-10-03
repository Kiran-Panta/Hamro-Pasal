import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import Loading from "../Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Link } from "react-router-dom";
import moment from "moment";
import toast from "react-hot-toast";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${server}/api/order/admin/all`, {
        headers: {
          token: Cookies.get("token"),
        },
      });

      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/order/${orderId}`,
        { status },
        {
          headers: {
            token: Cookies.get("token"),
          },
        },
      );

      toast.success(data.message);
      await fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating order");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const email = order?.user?.email || "";
    const name = order?.user?.name || "";
    const id = order?._id || "";

    return (
      email.toLowerCase().includes(search.toLowerCase()) ||
      name.toLowerCase().includes(search.toLowerCase()) ||
      id.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Orders</h1>

      <Input
        placeholder="search by name, email or order id"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/2"
      />

      {loading ? (
        <Loading />
      ) : filteredOrders.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Id</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>
                    <Link to={`/order/${order._id}`}>{order._id}</Link>
                  </TableCell>

                  {/* ✅ NEW: Name + Email */}
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {order?.user?.name || "Unknown User"}
                      </span>
                      <span className="text-sm text-gray-500">
                        {order?.user?.email || "No email"}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>{order.subTotal}</TableCell>

                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        order.status === "Pending"
                          ? "bg-yellow-500"
                          : order.status === "Shipped"
                            ? "bg-blue-500"
                            : "bg-green-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>

                  <TableCell>
                    {moment(order.createdAt).format("DD MMM YYYY")}
                  </TableCell>

                  <TableCell>
                    {/* <select
                      value={order.status}
                      className="w-[150px] px-3 py-2 border rounded-md"
                      onChange={(e) =>
                        updateOrderStatus(order._id, e.target.value)
                      }
                    >
                      <option className="text-black" value="Pending">Pending</option>
                      <option className="text-black" value="Shipped">Shipped</option>
                      <option className="text-black" value="Delivered">Delivered</option>
                    </select> */}
                    {order.status === "Delivered" ||
                    order.status === "Cancelled" ? (
                      <span className="text-sm text-muted-foreground">
                        No further changes
                      </span>
                    ) : (
                      <select
                        value={order.status}
                        className="w-[150px] px-3 py-2 border rounded-md"
                        onChange={(e) =>
                          updateOrderStatus(order._id, e.target.value)
                        }
                      >
                        {order.status === "Pending" && (
                          <>
                            <option className="text-black" value="Pending">
                              Pending
                            </option>

                            <option className="text-black" value="Shipped">
                              Shipped
                            </option>

                            <option className="text-black" value="Cancelled">
                              Cancelled
                            </option>
                          </>
                        )}

                        {order.status === "Shipped" && (
                          <>
                            <option className="text-black" value="Shipped">
                              Shipped
                            </option>

                            <option className="text-black" value="Delivered">
                              Delivered
                            </option>

                            <option className="text-black" value="Cancelled">
                              Cancelled
                            </option>
                          </>
                        )}
                      </select>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p>No Orders</p>
      )}
    </div>
  );
};

export default OrdersPage;
