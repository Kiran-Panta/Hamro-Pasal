// // export default ResetPassword;
// import { useState } from "react";
// import axios from "axios";
// import { server } from "@/main";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import {
//   LockKeyhole,
//   ShieldCheck,
//   ShoppingBag,
//   KeyRound,
//   Eye,
//   EyeOff,
// } from "lucide-react";

// const ResetPassword = () => {
//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();

//   const resetPassword = async () => {
//     try {
//       const email = localStorage.getItem("resetEmail");

//       const { data } = await axios.post(
//         `${server}/api/user/reset-password`,
//         {
//           email,
//           otp,
//           password,
//         }
//       );

//       toast.success(data.message);
//       localStorage.removeItem("resetEmail");

//       navigate("/login");
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f1f3f6] dark:bg-[#0d0e10] flex items-center justify-center px-4 py-8">

//       <div className="w-full max-w-md">

//         {/* Brand */}
//         <div className="text-center mb-6">
//           <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20 mb-4">
//             <ShoppingBag className="w-7 h-7 text-white" />
//           </div>

//           <h1 className="text-2xl font-bold tracking-tight">
//             Hamro Pasal
//           </h1>

//           <p className="text-sm text-muted-foreground mt-1">
//             Your everyday shopping destination
//           </p>
//         </div>

//         {/* Card */}
//         <Card className="border border-border/50 shadow-xl rounded-2xl bg-background overflow-hidden">

//           {/* Header */}
//           <div className="px-6 pt-7 pb-5 text-center">
//             <div className="mx-auto w-11 h-11 flex items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/20 mb-4">
//               <KeyRound className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//             </div>

//             <h2 className="text-2xl font-bold">
//               Reset Password
//             </h2>

//             <p className="text-sm text-muted-foreground mt-2">
//               Enter the OTP and create a new password
//             </p>
//           </div>

//           <CardContent className="px-6 pb-7">

//             <div className="space-y-5">

//               {/* OTP */}
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">
//                   Verification Code
//                 </label>

//                 <div className="relative">
//                   <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

//                   <Input
//                     placeholder="Enter OTP"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     className="pl-10 h-11 rounded-xl tracking-widest"
//                   />
//                 </div>

//                 <p className="text-xs text-muted-foreground">
//                   Enter the verification code sent to your email.
//                 </p>
//               </div>

//               {/* Password */}
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold">
//                   New Password
//                 </label>

//                 <div className="relative">
//                   <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

//                   <Input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter new password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="pl-10 pr-10 h-11 rounded-xl"
//                   />

//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="w-4 h-4" />
//                     ) : (
//                       <Eye className="w-4 h-4" />
//                     )}
//                   </button>
//                 </div>

//                 <p className="text-xs text-muted-foreground">
//                   Choose a secure password that you haven't used before.
//                 </p>
//               </div>

//               {/* Reset Button */}
//               <Button
//                 onClick={resetPassword}
//                 className="w-full h-11 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700"
//               >
//                 Reset Password
//               </Button>

//               {/* Security */}
//               <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-1">
//                 <ShieldCheck className="w-4 h-4 text-green-600" />
//                 <span>Your password is securely protected</span>
//               </div>

//             </div>
//           </CardContent>
//         </Card>

//         {/* Footer */}
//         <p className="text-center text-xs text-muted-foreground mt-6">
//           © {new Date().getFullYear()} Hamro Pasal. All rights reserved.
//         </p>

//       </div>
//     </div>
//   );
// };

// export default ResetPassword;


import { useState } from "react";
import axios from "axios";
import { server } from "@/main";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  LockKeyhole,
  ShieldCheck,
  ShoppingBag,
  KeyRound,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const resetPassword = async () => {
    // OTP validation
    if (!otp.trim()) {
      toast.error("Please enter the OTP");
      return;
    }

    // Password validation
    if (!password) {
      toast.error("Please enter your new password");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);

      const email = localStorage.getItem("resetEmail");

      if (!email) {
        toast.error("Reset session expired. Please request a new OTP.");
        navigate("/forgot-password");
        return;
      }

      const { data } = await axios.post(
        `${server}/api/user/reset-password`,
        {
          email,
          otp: otp.trim(),
          password,
        }
      );

      toast.success(data.message);

      localStorage.removeItem("resetEmail");

      navigate("/login");
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
            <ShoppingBag className="w-7 h-7 text-white" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            Hamro Pasal
          </h1>

          <p className="text-sm text-muted-foreground mt-1">
            Your everyday shopping destination
          </p>
        </div>

        {/* Card */}
        <Card className="border border-border/50 shadow-xl rounded-2xl bg-background overflow-hidden">

          {/* Header */}
          <div className="px-6 pt-7 pb-5 text-center">
            <div className="mx-auto w-11 h-11 flex items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/20 mb-4">
              <KeyRound className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>

            <h2 className="text-2xl font-bold">
              Reset Password
            </h2>

            <p className="text-sm text-muted-foreground mt-2">
              Enter the OTP and create a new password
            </p>
          </div>

          <CardContent className="px-6 pb-7">
            <div className="space-y-5">

              {/* OTP */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">
                  Verification Code
                </label>

                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                  <Input
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="pl-10 h-11 rounded-xl tracking-widest"
                    disabled={loading}
                  />
                </div>

                <p className="text-xs text-muted-foreground">
                  Enter the verification code sent to your email.
                </p>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">
                  New Password
                </label>

                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-11 rounded-xl"
                    disabled={loading}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <p className="text-xs text-muted-foreground">
                  Password must be at least 8 characters.
                </p>
              </div>

              {/* Reset Button */}
              <Button
                onClick={resetPassword}
                disabled={loading}
                className="w-full h-11 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Resetting Password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>

              {/* Security */}
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-1">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span>Your password is securely protected</span>
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

export default ResetPassword;