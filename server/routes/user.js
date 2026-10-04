// import express from "express";
// import { loginUser, myProfile, verifyUser } from "../controller/user.js";
// import { isAuth } from "../middlewares/isAuth.js";

// const router = express.Router();

// router.post("/user/login", loginUser);
// router.post("/user/verify", verifyUser);
// router.get("/user/me", isAuth, myProfile);

// export default router;

// import express from "express";
// import {
//   registerUser,
//   loginUser,
//   myProfile,
// } from "../controller/user.js";

// import { isAuth } from "../middlewares/isAuth.js";

// const router = express.Router();

// // ✅ AUTH ROUTES
// router.post("/user/register", registerUser);
// router.post("/user/login", loginUser);

// // ✅ PROTECTED ROUTE
// router.get("/user/me", isAuth, myProfile);

// export default router;



import express from "express";
import {
  registerUser,
  loginUser,
  myProfile,
  forgotPassword,
  resetPassword,
  updateProfile,
  getAllUsers,
  blockUser,
  unblockUser,
} from "../controller/user.js";

import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

router.post("/user/forgot-password", forgotPassword);
router.post("/user/reset-password", resetPassword);

router.get("/user/me", isAuth, myProfile);
router.put("/user/update-profile", isAuth, updateProfile);

// ADMIN USER MANAGEMENT
router.get("/user/admin/all", isAuth, getAllUsers);
router.put("/user/admin/:id/block", isAuth, blockUser);
router.put("/user/admin/:id/unblock", isAuth, unblockUser);

export default router;