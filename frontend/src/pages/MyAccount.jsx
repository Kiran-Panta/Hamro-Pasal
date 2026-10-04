import React, { useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ShieldCheck,
  KeyRound,
  Save,
} from "lucide-react";
import { UserData } from "@/context/UserContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const MyAccount = () => {
  const { user, updateProfile, btnLoading } = UserData();

  const [form, setForm] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Name validation
    if (!form.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    // If user wants to change password
    if (
      form.newPassword ||
      form.currentPassword ||
      form.confirmPassword
    ) {
      if (!form.currentPassword) {
        toast.error("Please enter your current password");
        return;
      }

      if (!form.newPassword) {
        toast.error("Please enter your new password");
        return;
      }

      if (form.newPassword.length < 8) {
        toast.error("New password must be at least 8 characters");
        return;
      }

      if (!form.confirmPassword) {
        toast.error("Please confirm your new password");
        return;
      }

      if (form.newPassword !== form.confirmPassword) {
        toast.error("New passwords do not match");
        return;
      }
    }

    const success = await updateProfile(
      form.name.trim(),
      form.email.trim(),
      form.currentPassword,
      form.newPassword
    );

    if (success) {
      setForm((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] dark:bg-[#0d0e10] py-6 md:py-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Profile Header */}
        <div className="bg-background rounded-2xl border border-border/50 shadow-sm overflow-hidden mb-6">
          <div className="h-28 bg-gradient-to-r from-blue-600 to-blue-500" />

          <div className="px-5 md:px-7 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10">

              {/* Avatar */}
              <div className="w-20 h-20 rounded-2xl bg-background border-4 border-background shadow-md flex items-center justify-center">
                <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <User className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
              </div>

              <div className="pb-1">
                <h1 className="text-2xl md:text-3xl font-bold">
                  My Account
                </h1>

                <p className="text-sm text-muted-foreground mt-1">
                  Manage your personal information and account security.
                </p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Personal Information */}
          <div className="bg-background rounded-2xl border border-border/50 shadow-sm overflow-hidden">

            <div className="px-5 md:px-7 py-5 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>

                <div>
                  <h2 className="text-lg font-bold">
                    Personal Information
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Update your basic account details.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 md:p-7 space-y-6">

              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">
                  Full Name
                </label>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                  <Input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="pl-10 h-11 rounded-xl"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                  <Input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="pl-10 h-11 rounded-xl"
                  />
                </div>
              </div>

              {/* Account Security Info */}
              <div className="flex gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
                <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />

                <div>
                  <p className="text-sm font-semibold">
                    Keep your information secure
                  </p>

                  <p className="text-xs text-muted-foreground mt-1">
                    Make sure your email address is correct so you can
                    receive important account notifications.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-background rounded-2xl border border-border/50 shadow-sm overflow-hidden">

            <div className="px-5 md:px-7 py-5 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <KeyRound className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>

                <div>
                  <h2 className="text-lg font-bold">
                    Change Password
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Update your password to keep your account secure.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 md:p-7">

              {/* Password Requirement */}
              <div className="mb-6 p-4 rounded-xl bg-muted/50 border border-border/50">
                <p className="text-sm font-medium">
                  Password requirements
                </p>

                <p className="text-xs text-muted-foreground mt-1">
                  Your new password must contain at least 8 characters.
                  Leave all password fields empty if you don't want to
                  change your password.
                </p>
              </div>

              <div className="space-y-5">

                {/* Current Password */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold">
                    Current Password
                  </label>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                    <Input
                      type={
                        showCurrentPassword ? "text" : "password"
                      }
                      name="currentPassword"
                      value={form.currentPassword}
                      onChange={handleChange}
                      placeholder="Enter current password"
                      className="pl-10 pr-10 h-11 rounded-xl"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold">
                    New Password
                  </label>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                    <Input
                      type={
                        showNewPassword ? "text" : "password"
                      }
                      name="newPassword"
                      value={form.newPassword}
                      onChange={handleChange}
                      placeholder="Enter new password"
                      className="pl-10 pr-10 h-11 rounded-xl"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowNewPassword(!showNewPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold">
                    Confirm New Password
                  </label>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                    <Input
                      type={
                        showConfirmPassword ? "text" : "password"
                      }
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm new password"
                      className="pl-10 pr-10 h-11 rounded-xl"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Save Changes */}
          <div className="bg-background rounded-2xl border border-border/50 shadow-sm p-5 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div>
                <p className="font-semibold">
                  Save your changes
                </p>

                <p className="text-sm text-muted-foreground mt-1">
                  Your account information will be updated securely.
                </p>
              </div>

              <Button
                type="submit"
                disabled={btnLoading}
                className="w-full sm:w-auto min-w-[170px] h-11 rounded-xl"
              >
                {btnLoading ? (
                  "Saving Changes..."
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>

            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default MyAccount;