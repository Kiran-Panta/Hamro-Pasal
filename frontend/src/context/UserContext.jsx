// import { server } from "@/main";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { createContext, useContext, useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [btnLoading, setBtnLoading] = useState(false);
//   const [isAuth, setIsAuth] = useState(false);

//   async function loginUser(email, navigate) {
//     setBtnLoading(true);
//     try {
//       const { data } = await axios.post(`${server}/api/user/login`, { email });

//       toast.success(data.message);
//       localStorage.setItem("email", email);
//       navigate("/verify");
//       setBtnLoading(false);
//     } catch (error) {
//       toast.error(error.response.data.message);
//       setBtnLoading(false);
//     }
//   }
//   async function verifyUser(otp, navigate, fetchCart) {
//     setBtnLoading(true);
//     const email = localStorage.getItem("email");
//     try {
//       const { data } = await axios.post(`${server}/api/user/verify`, {
//         email,
//         otp,
//       });

//       toast.success(data.message);
//       localStorage.clear();
//       navigate("/");
//       setBtnLoading(false);
//       setIsAuth(true);
//       setUser(data.user);

//       Cookies.set("token", data.token, {
//         expires: 15,
//         secure: true,
//         path: "/",
//       });

//       fetchCart();
//     } catch (error) {
//       toast.error(error.response.data.message);
//       setBtnLoading(false);
//     }
//   }

//   async function fetchUser() {
//     try {
//       const { data } = await axios.get(`${server}/api/user/me`, {
//         headers: {
//           token: Cookies.get("token"),
//         },
//       });

//       setIsAuth(true);
//       setUser(data);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setIsAuth(false);
//       setLoading(false);
//     }
//   }

//   function logoutUser(navigate, setTotalItem) {
//     Cookies.set("token", null);
//     setUser([]);
//     setIsAuth(false);
//     navigate("/login");
//     toast.success("Logged Out");
//     setTotalItem(0);
//   }

//   useEffect(() => {
//     fetchUser();
//   }, []);
//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         loading,
//         btnLoading,
//         isAuth,
//         loginUser,
//         verifyUser,
//         logoutUser,
//       }}
//     >
//       {children}
//       <Toaster />
//     </UserContext.Provider>
//   );
// };

// export const UserData = () => useContext(UserContext);




import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  // ✅ REGISTER USER
  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/register`, {
        name,
        email,
        password,
      });

      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setBtnLoading(false);
    }
  }

  // ✅ LOGIN USER
  async function loginUser(email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/login`, {
        email,
        password,
      });

      toast.success(data.message);

      Cookies.set("token", data.token, {
        expires: 15,
        secure: true,
        path: "/",
      });

      setUser(data.user);
      setIsAuth(true);

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setBtnLoading(false);
    }
  }

  // ✅ UPDATE USER PROFILE
  async function updateProfile(
    name,
    email,
    currentPassword,
    newPassword
  ) {
    setBtnLoading(true);

    try {
      const { data } = await axios.put(
        `${server}/api/user/update-profile`,
        {
          name,
          email,
          currentPassword,
          newPassword,
        },
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );

      toast.success(data.message);

      // Update user information immediately
      setUser(data.user);

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update profile"
      );

      return false;
    } finally {
      setBtnLoading(false);
    }
  }

  // ✅ FETCH LOGGED USER
  async function fetchUser() {
    try {
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: {
          token: Cookies.get("token"),
        },
      });

      setUser(data);
      setIsAuth(true);
    } catch (error) {
      setUser(null);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }

  // ✅ LOGOUT
  function logoutUser(navigate, setTotalItem) {
    Cookies.remove("token");
    setUser(null);
    setIsAuth(false);
    setTotalItem(0);

    navigate("/login");
    toast.success("Logged Out");
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        btnLoading,
        isAuth,
        registerUser,
        loginUser,
        updateProfile,
        logoutUser,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);