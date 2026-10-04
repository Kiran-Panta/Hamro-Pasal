import { User } from "../models/User.js";
import TryCatch from "../utils/TryCatch.js";
import { OTP } from "../models/Otp.js";
import sendOtp from "../utils/sendOtp.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

/* =========================
   REGISTER USER
========================= */
export const registerUser = TryCatch(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters",
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      message: "Email already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SEC, {
    expiresIn: "15d",
  });

  res.status(201).json({
    message: "Account created successfully",
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

/* =========================
   LOGIN USER
========================= */
export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const user = await User.findOne({ email });
  

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  if (user.isBlocked) {
  return res.status(403).json({
    message: "Your account has been blocked by the administrator",
  });
}

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SEC, {
    expiresIn: "15d",
  });

  res.json({
    message: "Login successful",
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

/* =========================
   GET LOGGED USER
========================= */
export const myProfile = TryCatch(async (req, res) => {
  // const user = await User.findById(req.user._id).select(
  //   "name email role wishlist",
  // );

  const user = await User.findById(req.user._id).select(
  "name email role wishlist isBlocked"
);

  res.json(user);
});

export const forgotPassword = TryCatch(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  await OTP.deleteMany({ email });

  await OTP.create({
    email,
    otp,
  });

  await sendOtp({
    email,
    subject: "Password Reset OTP",
    otp,
  });

  res.json({
    message: "OTP sent to email",
  });
});

export const resetPassword = TryCatch(async (req, res) => {
  const { email, otp, password } = req.body;

  if (!password || password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters",
    });
  }

  const validOtp = await OTP.findOne({ email, otp });

  if (!validOtp) {
    return res.status(400).json({
      message: "Invalid OTP",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.findOneAndUpdate(
    { email },
    { password: hashedPassword }
  );

  await validOtp.deleteOne();

  res.json({
    message: "Password reset successful",
  });
});


/* =========================
   UPDATE USER PROFILE
========================= */
export const updateProfile = TryCatch(async (req, res) => {
  const { name, email, currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  // Update name
  if (name) {
    user.name = name;
  }

  // Update email
  if (email && email !== user.email) {
    const existingUser = await User.findOne({
      email,
      _id: { $ne: user._id },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    user.email = email;
  }

  // Update password
  if (newPassword) {
    if (!currentPassword) {
      return res.status(400).json({
        message: "Current password is required",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    // if (newPassword.length < 6) {
    //   return res.status(400).json({
    //     message: "New password must be at least 6 characters",
    //   });
    // }

    if (newPassword.length < 8) {
      return res.status(400).json({
        message: "New password must be at least 8 characters",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
  }

  await user.save();

  res.json({
    message: "Profile updated successfully",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

/* =========================
   GET ALL USERS - ADMIN
========================= */
export const getAllUsers = TryCatch(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "You are not admin",
    });
  }

  const users = await User.find()
    .select("-password")
    .sort({ createdAt: -1 });

  res.json(users);
});

/* =========================
   BLOCK USER - ADMIN
========================= */
export const blockUser = TryCatch(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "You are not admin",
    });
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (user.role === "admin") {
    return res.status(400).json({
      message: "Admin account cannot be blocked",
    });
  }

  user.isBlocked = true;

  await user.save();

  res.json({
    message: "User blocked successfully",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isBlocked: user.isBlocked,
    },
  });
});

/* =========================
   UNBLOCK USER - ADMIN
========================= */
export const unblockUser = TryCatch(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "You are not admin",
    });
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  user.isBlocked = false;

  await user.save();

  res.json({
    message: "User unblocked successfully",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isBlocked: user.isBlocked,
    },
  });
});
