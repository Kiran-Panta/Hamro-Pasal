import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { server } from "@/main";
import { Button } from "@/components/ui/button";
import {
  Search,
  UserCheck,
  UserX,
  ShieldCheck,
} from "lucide-react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [search, setSearch] = useState("");

  // =========================
  // FETCH ALL USERS
  // =========================
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${server}/api/user/admin/all`,
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );

      setUsers(data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // =========================
  // BLOCK / UNBLOCK USER
  // =========================
  const handleBlockToggle = async (user) => {
    try {
      setActionLoading(user._id);

      const url = user.isBlocked
        ? `${server}/api/user/admin/${user._id}/unblock`
        : `${server}/api/user/admin/${user._id}/block`;

      const { data } = await axios.put(
        url,
        {},
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );

      toast.success(data.message);

      // Update only the changed user
      setUsers((prevUsers) =>
        prevUsers.map((item) =>
          item._id === user._id
            ? {
                ...item,
                isBlocked: data.user.isBlocked,
              }
            : item
        )
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update user"
      );
    } finally {
      setActionLoading(null);
    }
  };

  // =========================
  // SEARCH
  // =========================
  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    return (
      user.name?.toLowerCase().includes(searchText) ||
      user.email?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Manage Users
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          View and manage registered users.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg pl-10 pr-4 py-2 bg-background outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Users Table */}
      <div className="border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3">
                  Name
                </th>

                <th className="text-left px-4 py-3">
                  Email
                </th>

                <th className="text-left px-4 py-3">
                  Role
                </th>

                <th className="text-left px-4 py-3">
                  Status
                </th>

                <th className="text-left px-4 py-3">
                  Joined
                </th>

                <th className="text-left px-4 py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10"
                  >
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t"
                  >
                    {/* Name */}
                    <td className="px-4 py-4 font-medium">
                      {user.name}
                    </td>

                    {/* Email */}
                    <td className="px-4 py-4">
                      {user.email}
                    </td>

                    {/* Role */}
                    <td className="px-4 py-4">
                      {user.role === "admin" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                          <ShieldCheck className="w-3 h-3" />
                          Admin
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                          User
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      {user.isBlocked ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                          <UserX className="w-3 h-3" />
                          Blocked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                          <UserCheck className="w-3 h-3" />
                          Active
                        </span>
                      )}
                    </td>

                    {/* Joined */}
                    <td className="px-4 py-4">
                      {new Date(
                        user.createdAt
                      ).toLocaleDateString()}
                    </td>

                    {/* Action */}
                    <td className="px-4 py-4">
                      {user.role === "admin" ? (
                        <span className="text-xs text-muted-foreground">
                          Protected
                        </span>
                      ) : (
                        <Button
                          size="sm"
                          variant={
                            user.isBlocked
                              ? "outline"
                              : "destructive"
                          }
                          disabled={
                            actionLoading === user._id
                          }
                          onClick={() =>
                            handleBlockToggle(user)
                          }
                        >
                          {actionLoading === user._id
                            ? "Updating..."
                            : user.isBlocked
                            ? "Unblock"
                            : "Block"}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Count */}
      {!loading && (
        <p className="text-sm text-muted-foreground">
          Showing {filteredUsers.length} of{" "}
          {users.length} users
        </p>
      )}
    </div>
  );
};

export default UsersPage;