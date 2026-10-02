import { useState } from "react";
import axios from "axios";
import { server } from "@/main";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const resetPassword = async () => {
    try {
      const email = localStorage.getItem("resetEmail");

      const { data } = await axios.post(
        `${server}/api/user/reset-password`,
        {
          email,
          otp,
          password,
        }
      );

      toast.success(data.message);
      localStorage.removeItem("resetEmail");

      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[400px] p-6">
        <CardContent className="space-y-4">

          <h2 className="text-xl font-semibold">Reset Password</h2>

          <Input
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <Input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button onClick={resetPassword} className="w-full">
            Reset Password
          </Button>

        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;