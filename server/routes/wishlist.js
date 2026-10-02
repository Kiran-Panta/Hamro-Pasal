import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { toggleWishlist, getWishlist } from "../controller/wishlist.js";

const router = express.Router();

// ❤️ add/remove wishlist
router.put("/toggle/:id", isAuth, toggleWishlist);

// 📦 get wishlist
router.get("/", isAuth, getWishlist);

export default router;