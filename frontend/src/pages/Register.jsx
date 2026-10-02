import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserData } from "@/context/UserContext";
import { Loader, UserPlus } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { registerUser, btnLoading } = UserData();

  const submitHandler = () => {
    registerUser(name, email, password, navigate);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-[#0b0c0f]">

      <Card className="w-full max-w-md border shadow-xl rounded-2xl bg-white dark:bg-[#111318]">

        {/* Header */}
        <div className="p-6 text-center border-b dark:border-gray-800">
          <div className="mx-auto w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 mb-3">
            <UserPlus className="w-5 h-5" />
          </div>

          <h2 className="text-xl font-semibold">Create account</h2>
          <p className="text-sm text-gray-500">Join us today</p>
        </div>

        <CardContent className="p-6 space-y-4">

          {/* Name */}
          <div>
            <Label>Full Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Name"
            />
          </div>

          {/* Email */}
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="me@gmail.com"
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

          {/* Button */}
          <Button onClick={submitHandler} disabled={btnLoading} className="w-full">
            {btnLoading ? <Loader className="animate-spin" /> : "Create Account"}
          </Button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-black dark:text-white font-medium">
              Login
            </Link>
          </p>

        </CardContent>
      </Card>
    </div>
  );
};

export default Register;