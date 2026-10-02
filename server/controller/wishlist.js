import { User } from "../models/User.js";

// ADD OR REMOVE FROM WISHLIST
export const toggleWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ensure wishlist exists (safety)
    if (!user.wishlist) user.wishlist = [];

    const isExist = user.wishlist.some(
      (id) => id.toString() === productId
    );

    if (isExist) {
      user.wishlist = user.wishlist.filter(
        (id) => id.toString() !== productId
      );
    } else {
      user.wishlist.push(productId);
    }

    await user.save();

    res.json({
      success: true,
      message: isExist
        ? "Removed from wishlist"
        : "Added to wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({
      message: "Wishlist error",
      error: error.message,
    });
  }
};

// GET WISHLIST
export const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("wishlist");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      wishlist: user.wishlist || [],
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching wishlist",
      error: error.message,
    });
  }
};