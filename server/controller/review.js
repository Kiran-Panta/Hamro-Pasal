// import { Product } from "../models/Product.js";

// // ADD REVIEW
// export const addReview = async (req, res) => {
//   try {
//     const { rating, comment } = req.body;
//     const productId = req.params.id;

//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // prevent duplicate review
//     const alreadyReviewed = product.reviews.find(
//       (r) => r.user.toString() === req.user._id.toString()
//     );

//     if (alreadyReviewed) {
//       return res.status(400).json({
//         message: "You already reviewed this product",
//       });
//     }

//     const review = {
//       user: req.user._id,
//       name: req.user.name || "User",
//       rating: Number(rating),
//       comment,
//     };

//     product.reviews.push(review);
//     product.numReviews = product.reviews.length;

//     // ⭐ IMPORTANT: calculate average rating
//     product.rating =
//       product.reviews.reduce((acc, item) => item.rating + acc, 0) /
//       product.reviews.length;

//     await product.save();

//     res.json({
//       success: true,
//       message: "Review added successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Review error",
//       error: error.message,
//     });
//   }
// };

import { Product } from "../models/Product.js";

// export const addReview = async (req, res) => {
//   try {
//     const { rating, comment } = req.body;
//     const productId = req.params.id;

//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // check if user already reviewed
//     const alreadyReviewed = product.reviews.find(
//       (r) => r.user.toString() === req.user._id.toString()
//     );

//     if (alreadyReviewed) {
//       return res.status(400).json({ message: "Already reviewed this product" });
//     }

//     const review = {
//       user: req.user._id,
//       name: req.user.name,
//       rating: Number(rating),
//       comment,
//     };

//     product.reviews.push(review);

//     // UPDATE TOTAL REVIEWS
//     product.numReviews = product.reviews.length;

//     // UPDATE AVERAGE RATING
//     product.rating =
//       product.reviews.reduce((acc, item) => item.rating + acc, 0) /
//       product.reviews.length;

//     await product.save();

//     res.json({
//       success: true,
//       message: "Review added successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Review error",
//       error: error.message,
//     });
//   }
// };

export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.productId);

    if (!product) return res.status(404).json({ message: "Product not found" });

    const already = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString(),
    );

    if (already)
      return res
        .status(400)
        .json({ message: "You already reviewed this product" });

    product.reviews.push({
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
      likes: [],
    });

    updateRatings(product);

    await product.save();

    res.json({ message: "Review added" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const editReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.productId);

    if (!product) return res.status(404).json({ message: "Product not found" });

    const review = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString(),
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    updateRatings(product);

    await product.save();

    res.json({ message: "Review updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) return res.status(404).json({ message: "Product not found" });

    product.reviews = product.reviews.filter(
      (r) => r._id.toString() !== req.params.reviewId,
    );

    updateRatings(product);

    await product.save();

    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const likeReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) return res.status(404).json({ message: "Product not found" });

    const review = product.reviews.id(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const alreadyLiked = review.likes.some(
      (id) => id.toString() === req.user._id.toString(),
    );

    if (alreadyLiked) {
      review.likes = review.likes.filter(
        (id) => id.toString() !== req.user._id.toString(),
      );
    } else {
      review.likes.push(req.user._id);
    }

    await product.save();

    res.json({ message: "Updated like", likes: review.likes.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateRatings = (product) => {
  product.numReviews = product.reviews.length;

  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    (product.reviews.length || 1);
};
