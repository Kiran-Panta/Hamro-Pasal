import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserData } from "@/context/UserContext";
import { Loader, LockKeyhole } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { loginUser, btnLoading } = UserData();

  const submitHandler = () => {
    loginUser(email, password, navigate);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-[#0b0c0f]">
      <Card className="w-full max-w-md border shadow-xl rounded-2xl bg-white dark:bg-[#111318]">
        {/* Header */}
        <div className="p-6 text-center border-b dark:border-gray-800">
          <div className="mx-auto w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 mb-3">
            <LockKeyhole className="w-5 h-5" />
          </div>

          <h2 className="text-xl font-semibold">Welcome back</h2>
          <p className="text-sm text-gray-500">Login to continue</p>
        </div>

        <CardContent className="p-6 space-y-4">
          {/* Email */}
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
            />
          </div>

          {/* Password */}
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition"
            >
              Forgot password?
            </Link>
          </div>

          {/* Button */}
          <Button
            onClick={submitHandler}
            disabled={btnLoading}
            className="w-full"
          >
            {btnLoading ? <Loader className="animate-spin" /> : "Login"}
          </Button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-black dark:text-white font-medium"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
