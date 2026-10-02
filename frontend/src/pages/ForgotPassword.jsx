import { useState } from "react";
import axios from "axios";
import { server } from "@/main";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const { data } = await axios.post(
        `${server}/api/user/forgot-password`,
        { email }
      );

      toast.success(data.message);
      localStorage.setItem("resetEmail", email);
      navigate("/reset-password");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[400px] p-6">
        <CardContent className="space-y-4">

          <h2 className="text-xl font-semibold">Forgot Password</h2>

          <Input
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button onClick={sendOtp} className="w-full">
            Send OTP
          </Button>

        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;