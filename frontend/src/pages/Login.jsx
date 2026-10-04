// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { UserData } from "@/context/UserContext";
// import { Loader, LockKeyhole } from "lucide-react";
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();
//   const { loginUser, btnLoading } = UserData();

//   const submitHandler = () => {
//     loginUser(email, password, navigate);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-[#0b0c0f]">
//       <Card className="w-full max-w-md border shadow-xl rounded-2xl bg-white dark:bg-[#111318]">
//         {/* Header */}
//         <div className="p-6 text-center border-b dark:border-gray-800">
//           <div className="mx-auto w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 mb-3">
//             <LockKeyhole className="w-5 h-5" />
//           </div>

//           <h2 className="text-xl font-semibold">Welcome back</h2>
//           <p className="text-sm text-gray-500">Login to continue</p>
//         </div>

//         <CardContent className="p-6 space-y-4">
//           {/* Email */}
//           <div>
//             <Label>Email</Label>
//             <Input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter Your Email"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <Label>Password</Label>
//             <Input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//             />
//           </div>

//           <div className="flex justify-end">
//             <Link
//               to="/forgot-password"
//               className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition"
//             >
//               Forgot password?
//             </Link>
//           </div>

//           {/* Button */}
//           <Button
//             onClick={submitHandler}
//             disabled={btnLoading}
//             className="w-full"
//           >
//             {btnLoading ? <Loader className="animate-spin" /> : "Login"}
//           </Button>

//           {/* Register Link */}
//           <p className="text-center text-sm text-gray-500">
//             Don't have an account?{" "}
//             <Link
//               to="/register"
//               className="text-black dark:text-white font-medium"
//             >
//               Register
//             </Link>
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Login;


import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserData } from "@/context/UserContext";
import {
  Loader,
  LockKeyhole,
  Mail,
  ShoppingBag,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { loginUser, btnLoading } = UserData();

  const submitHandler = () => {
    loginUser(email, password, navigate);
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

        {/* Login Card */}
        <Card className="border border-border/50 shadow-xl rounded-2xl bg-background overflow-hidden">

          {/* Header */}
          <div className="px-6 pt-7 pb-5 text-center">
            <div className="mx-auto w-11 h-11 flex items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/20 mb-4">
              <LockKeyhole className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>

            <h2 className="text-2xl font-bold">
              Welcome back
            </h2>

            <p className="text-sm text-muted-foreground mt-2">
              Sign in to continue shopping
            </p>
          </div>

          <CardContent className="px-6 pb-7">

            <div className="space-y-5">

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email Address
                </Label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 h-11 rounded-xl"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-sm font-semibold"
                  >
                    Password
                  </Label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 h-11 rounded-xl"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <Button
                onClick={submitHandler}
                disabled={btnLoading}
                className="w-full h-11 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700"
              >
                {btnLoading ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              {/* Security message */}
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-1">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span>Your account information is secure</span>
              </div>

              {/* Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>

                <div className="relative flex justify-center">
                  <span className="bg-background px-3 text-xs text-muted-foreground">
                    New to Hamro Pasal?
                  </span>
                </div>
              </div>

              {/* Register */}
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  Create an account
                </Link>
              </p>

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

export default Login;