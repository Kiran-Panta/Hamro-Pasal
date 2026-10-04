// import { useState } from "react";
// import axios from "axios";
// import { server } from "@/main";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();

//   const sendOtp = async () => {
//     try {
//       const { data } = await axios.post(
//         `${server}/api/user/forgot-password`,
//         { email }
//       );

//       toast.success(data.message);
//       localStorage.setItem("resetEmail", email);
//       navigate("/reset-password");
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <Card className="w-[400px] p-6">
//         <CardContent className="space-y-4">

//           <h2 className="text-xl font-semibold">Forgot Password</h2>

//           <Input
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <Button onClick={sendOtp} className="w-full">
//             Send OTP
//           </Button>

//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ForgotPassword;

import { useState } from "react";
import axios from "axios";
import { server } from "@/main";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader2, Mail, KeyRound, ShieldCheck } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const sendOtp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${server}/api/user/forgot-password`,
        { email: email.trim() }
      );

      toast.success(data.message);

      localStorage.setItem("resetEmail", email.trim());

      navigate("/reset-password");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] dark:bg-[#0d0e10] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20 mb-4">
            <KeyRound className="w-7 h-7 text-white" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            Hamro Pasal
          </h1>

          <p className="text-sm text-muted-foreground mt-1">
            Reset your account password
          </p>
        </div>

        {/* Card */}
        <Card className="border border-border/50 shadow-xl rounded-2xl bg-background overflow-hidden">
          <CardContent className="p-6 md:p-7">

            {/* Header */}
            <div className="text-center mb-6">
              <div className="mx-auto w-11 h-11 flex items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/20 mb-4">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>

              <h2 className="text-2xl font-bold">
                Forgot Password?
              </h2>

              <p className="text-sm text-muted-foreground mt-2">
                Enter your email address and we'll send you an OTP
                to reset your password.
              </p>
            </div>

            <div className="space-y-5">

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 h-11 rounded-xl"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Send OTP */}
              <Button
                type="button"
                onClick={sendOtp}
                disabled={loading}
                className="w-full h-11 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )}
              </Button>

              {/* Info */}
              <div className="flex gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
                <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />

                <p className="text-xs text-muted-foreground leading-relaxed">
                  Make sure you enter the email address associated
                  with your Hamro Pasal account.
                </p>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          © {new Date().getFullYear()} Hamro Pasal. All rights reserved.
        </p>

      </div>
    </div>
  );
};

export default ForgotPassword;