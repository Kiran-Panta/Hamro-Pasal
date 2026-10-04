// import jwt from "jsonwebtoken";
// import { User } from "../models/User.js";

// export const isAuth = async (req, res, next) => {
//   try {
//     const { token } = req.headers;

//     if (!token) {
//       return res.status(403).json({
//         message: "Please login",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SEC);

//     const user = await User.findById(decoded._id).select(
//       "name email role isBlocked",
//     );

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     req.user = {
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       isBlocked: user.isBlocked,
//     };

//     next();
//   } catch (error) {
//     return res.status(401).json({
//       message: "Invalid or expired token, please login again",
//     });
//   }
// };

import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(403).json({
        message: "Please login",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SEC);

    const user = await User.findById(decoded._id).select(
      "name email role isBlocked"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        message: "Your account has been blocked by the administrator",
      });
    }

    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isBlocked: user.isBlocked,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token, please login again",
    });
  }
};


