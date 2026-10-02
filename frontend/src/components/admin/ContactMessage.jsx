import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { server } from "@/main";
import toast from "react-hot-toast";
import Loading from "../Loading";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { Button } from "../ui/button";

const ContactMessage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // =========================
  // FETCH CONTACT MESSAGES
  // =========================
  const fetchMessages = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${server}/api/contact/admin`,
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );

      setMessages(data.messages || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load messages"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // =========================
  // DELETE MESSAGE
  // =========================
  const deleteMessage = async (id) => {
    setDeletingId(id);

    try {
      const { data } = await axios.delete(
        `${server}/api/contact/admin/${id}`,
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );

      toast.success(data.message);

      setMessages((prev) =>
        prev.filter((message) => message._id !== id)
      );

      setSelectedMessage(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete message"
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-4">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            Contact Messages
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Messages received from customers
          </p>
        </div>

        <div className="border rounded-lg px-4 py-2">
          <span className="text-sm text-gray-500">
            Total Messages
          </span>

          <p className="text-xl font-bold">
            {messages.length}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      {loading ? (
        <Loading />
      ) : messages.length === 0 ? (
        <div className="border rounded-xl p-10 text-center">
          <h3 className="text-lg font-semibold">
            No Contact Messages
          </h3>

          <p className="text-gray-500 mt-2">
            Customer messages will appear here.
          </p>
        </div>
      ) : (
        <div className="border rounded-xl overflow-hidden">
          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="text-left p-4">
                    Name
                  </th>

                  <th className="text-left p-4">
                    Email
                  </th>

                  <th className="text-left p-4">
                    Message
                  </th>

                  <th className="text-left p-4">
                    Date
                  </th>

                  <th className="text-center p-4">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {messages.map((message) => (
                  <tr
                    key={message._id}
                    className="border-t"
                  >
                    {/* NAME */}
                    <td className="p-4 font-medium">
                      {message.name}
                    </td>

                    {/* EMAIL */}
                    <td className="p-4">
                      {message.email}
                    </td>

                    {/* MESSAGE */}
                    <td className="p-4 max-w-[300px]">
                      <p className="truncate">
                        {message.message}
                      </p>
                    </td>

                    {/* DATE */}
                    <td className="p-4 whitespace-nowrap">
                      {new Date(
                        message.createdAt
                      ).toLocaleDateString()}
                    </td>

                    {/* ACTION */}
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="outline"
                          onClick={() =>
                            setSelectedMessage(message)
                          }
                        >
                          View
                        </Button>

                        <Button
                          variant="destructive"
                          onClick={() =>
                            deleteMessage(message._id)
                          }
                          disabled={
                            deletingId === message._id
                          }
                        >
                          {deletingId === message._id
                            ? "Deleting..."
                            : "Delete"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MESSAGE DETAILS DIALOG */}
      <Dialog
        open={!!selectedMessage}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedMessage(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-[600px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>
              Contact Message
            </DialogTitle>
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-5 mt-4">
              {/* NAME */}
              <div>
                <p className="text-sm text-gray-500">
                  Name
                </p>

                <p className="font-semibold">
                  {selectedMessage.name}
                </p>
              </div>

              {/* EMAIL */}
              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p className="font-semibold break-all">
                  {selectedMessage.email}
                </p>
              </div>

              {/* DATE */}
              <div>
                <p className="text-sm text-gray-500">
                  Date
                </p>

                <p>
                  {new Date(
                    selectedMessage.createdAt
                  ).toLocaleString()}
                </p>
              </div>

              {/* MESSAGE */}
              <div>
                <p className="text-sm text-gray-500 mb-2">
                  Message
                </p>

                <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                  <p className="whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    setSelectedMessage(null)
                  }
                >
                  Close
                </Button>

                <Button
                  variant="destructive"
                  onClick={() =>
                    deleteMessage(selectedMessage._id)
                  }
                  disabled={
                    deletingId === selectedMessage._id
                  }
                >
                  {deletingId === selectedMessage._id
                    ? "Deleting..."
                    : "Delete Message"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactMessage;
