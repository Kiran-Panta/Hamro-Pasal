import { Product } from "../models/Product.js";
import { User } from "../models/User.js";
import { Cart } from "../models/Cart.js";
import { Order } from "../models/Order.js";

import TryCatch from "../utils/TryCatch.js";
import bufferGenerator from "../utils/bufferGenerator.js";
import cloudinary from "cloudinary";

import { calculateRecommendationScore } from "../utils/recommendation.js";

export const createProduct = TryCatch(async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({
      message: "You are not admin",
    });

  const { title, about, category, price, stock } = req.body;

  const files = req.files;

  if (!files || files.length === 0)
    return res.status(400).json({
      message: "no files to upload",
    });

  const imageUploadPromises = files.map(async (file) => {
    const fileBuffer = bufferGenerator(file);

    const result = await cloudinary.v2.uploader.upload(fileBuffer.content);

    return {
      id: result.public_id,
      url: result.secure_url,
    };
  });

  const uploadedImage = await Promise.all(imageUploadPromises);

  const product = await Product.create({
    title,
    about,
    category,
    price,
    stock,
    images: uploadedImage,
  });

  res.status(201).json({
    message: "Product Created",
    product,
  });
});

export const getAllProducts = TryCatch(async (req, res) => {
  const { search, category, page, sortByPrice } = req.query;

  const filter = {};

  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  if (category) {
    filter.category = category;
  }

  const limit = 8;

  const currentPage = Number(page) || 1;

  const skip = (currentPage - 1) * limit;

  let sortOption = { createdAt: -1 };

  if (sortByPrice) {
    if (sortByPrice === "lowToHigh") {
      sortOption = { price: 1 };
    } else if (sortByPrice === "highToLow") {
      sortOption = { price: -1 };
    }
  }

  const products = await Product.find(filter)
    .sort(sortOption)
    .limit(limit)
    .skip(skip);

  const totalInStock = await Product.countDocuments({
    ...filter,
    stock: { $gt: 0 },
  });

  const totalOutOfStock = await Product.countDocuments({
    ...filter,
    stock: { $lte: 0 },
  });

  const categories = await Product.distinct("category");

  const newProduct = await Product.find().sort("-createdAt").limit(4);

  // Count only products matching the current filter
  const countProduct = await Product.countDocuments(filter);

  const totalPages = Math.ceil(countProduct / limit);

  res.json({
    products,
    categories,
    totalPages,
    totalProducts: countProduct,
    totalInStock,
    totalOutOfStock,
    newProduct,
  });
});

export const getSingleProduct = TryCatch(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  const relatedProduct = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
  }).limit(4);

  res.json({
    product,
    relatedProduct,
  });
});

export const updateProduct = TryCatch(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "You are not admin",
    });
  }

  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // const { title, about, price, stock, category } = req.body;

  // product.title = title || product.title;
  // product.about = about || product.about;
  // product.price = price || product.price;
  // product.stock = stock || product.stock;
  // product.category = category || product.category;

  const { title, about, price, stock, category } = req.body;

  if (stock !== undefined && Number(stock) < 0) {
    return res.status(400).json({
      message: "Stock cannot be negative",
    });
  }

  if (price !== undefined && Number(price) < 0) {
    return res.status(400).json({
      message: "Price cannot be negative",
    });
  }

  product.title = title || product.title;
  product.about = about || product.about;

  if (price !== undefined) {
    product.price = Number(price);
  }

  if (stock !== undefined) {
    product.stock = Number(stock);
  }

  product.category = category || product.category;

  // ✅ FIXED IMAGE UPLOAD (USING BUFFER GENERATOR LIKE CREATE PRODUCT)
  if (req.files && req.files.length > 0) {
    const uploadedImages = [];

    for (let file of req.files) {
      const fileBuffer = bufferGenerator(file);

      const result = await cloudinary.v2.uploader.upload(fileBuffer.content);

      uploadedImages.push({
        id: result.public_id,
        url: result.secure_url,
      });
    }

    product.images = uploadedImages;
  }

  await product.save();

  res.json({
    message: "Product updated successfully",
    product,
  });
});

export const updateProductImage = TryCatch(async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({
      message: "You are not admin",
    });

  const { id } = req.params;
  const files = req.files;

  if (!files || files.length === 0)
    return res.status(400).json({
      message: "no files to upload",
    });

  const product = await Product.findById(id);

  if (!product)
    return res.status(404).json({
      message: "Product not found",
    });

  const oldImages = product.images || [];

  for (const img of oldImages) {
    if (img.id) {
      await cloudinary.v2.uploader.destroy(img.id);
    }
  }

  const imageUploadPromises = files.map(async (file) => {
    const fileBuffer = bufferGenerator(file);

    const result = await cloudinary.v2.uploader.upload(fileBuffer.content);

    return {
      id: result.public_id,
      url: result.secure_url,
    };
  });

  const uploadedImage = await Promise.all(imageUploadPromises);

  product.images = uploadedImage;

  await product.save();

  res.status(200).json({
    message: "Image updated",
    product,
  });
});

export const deleteProduct = TryCatch(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "You are not admin",
    });
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  // optional: delete cloudinary images
  for (const img of product.images) {
    if (img.id) {
      await cloudinary.v2.uploader.destroy(img.id);
    }
  }

  await product.deleteOne();

  res.json({
    message: "Product deleted successfully",
  });
});

export const getPersonalizedRecommendations = TryCatch(async (req, res) => {
  const userId = req.user._id;

  // --------------------------------
  // 1. Get user wishlist
  // --------------------------------

  const user = await User.findById(userId).select("wishlist").lean();

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  // --------------------------------
  // 2. Get cart products
  // --------------------------------

  const cartItems = await Cart.find({
    user: userId,
  })
    .populate("product")
    .lean();

  // --------------------------------
  // 3. Get purchased products
  // --------------------------------

  const orders = await Order.find({
    user: userId,
  })
    .populate("items.product")
    .lean();

  // --------------------------------
  // 4. Get wishlist products
  // --------------------------------

  const wishlistProducts = await Product.find({
    _id: {
      $in: user.wishlist || [],
    },
  }).lean();

  // --------------------------------
  // 5. Get all available products
  // --------------------------------

  const products = await Product.find({
    stock: { $gt: 0 },
  }).lean();

  // --------------------------------
  // 6. Extract purchased products
  // --------------------------------

  const purchasedProducts = [];

  orders.forEach((order) => {
    order.items?.forEach((item) => {
      if (item.product) {
        purchasedProducts.push(item.product);
      }
    });
  });

  // --------------------------------
  // 7. Extract cart products
  // --------------------------------

  const cartProducts = cartItems
    .filter((item) => item.product)
    .map((item) => item.product);

  // --------------------------------
  // 8. Combine user interactions
  // --------------------------------

  const interactedProducts = [
    ...purchasedProducts,
    ...cartProducts,
    ...wishlistProducts,
  ];

  // --------------------------------
  // 9. NEW USER FALLBACK
  // --------------------------------

  if (interactedProducts.length === 0) {
    const popularProducts = [...products]
      .sort((a, b) => {
        const scoreA = (a.sold || 0) * 2 + (a.rating || 0) * 10;

        const scoreB = (b.sold || 0) * 2 + (b.rating || 0) * 10;

        return scoreB - scoreA;
      })
      .slice(0, 6);

    return res.status(200).json({
      recommendations: popularProducts,
      type: "popular",
    });
  }

  // --------------------------------
  // 10. CATEGORY PREFERENCE
  // --------------------------------

  const categoryScores = {};

  // Purchased = strongest signal
  purchasedProducts.forEach((product) => {
    if (!product.category) return;

    categoryScores[product.category] =
      (categoryScores[product.category] || 0) + 5;
  });

  // Cart = second strongest
  cartProducts.forEach((product) => {
    if (!product.category) return;

    categoryScores[product.category] =
      (categoryScores[product.category] || 0) + 4;
  });

  // Wishlist = third strongest
  wishlistProducts.forEach((product) => {
    if (!product.category) return;

    categoryScores[product.category] =
      (categoryScores[product.category] || 0) + 3;
  });

  // --------------------------------
  // 11. Sort preferred categories
  // --------------------------------

  const preferredCategories = Object.entries(categoryScores)
    .sort((a, b) => b[1] - a[1])
    .map(([category]) => category);

  // --------------------------------
  // 12. Calculate average price
  // --------------------------------

  const prices = interactedProducts
    .map((product) => Number(product.price))
    .filter((price) => price > 0);

  const averagePrice =
    prices.length > 0
      ? prices.reduce((sum, price) => sum + price, 0) / prices.length
      : 0;

  // --------------------------------
  // 13. IDs of already interacted
  // products
  // --------------------------------

  const interactedIds = new Set(
    interactedProducts.map((product) => product._id.toString()),
  );

  console.log(
    "INTERACTED PRODUCTS:",
    interactedProducts.map((product) => ({
      id: product._id.toString(),
      title: product.title,
    })),
  );

  console.log(
    "AVAILABLE PRODUCTS:",
    products.map((product) => ({
      id: product._id.toString(),
      title: product.title,
      stock: product.stock,
    })),
  );

  console.log(
    "REMAINING PRODUCTS:",
    products
      .filter((product) => !interactedIds.has(product._id.toString()))
      .map((product) => product.title),
  );

  // --------------------------------
  // 14. Score candidate products
  // --------------------------------
  let recommendations = products
    .filter((product) => !interactedIds.has(product._id.toString()))
    .map((product) => {
      const score = calculateRecommendationScore(
        product,
        preferredCategories,
        averagePrice,
      );

      return {
        ...product,
        recommendationScore: score,
      };
    });

  // --------------------------------
  // 15. Sort personalized products
  // --------------------------------

  recommendations.sort((a, b) => b.recommendationScore - a.recommendationScore);

  // --------------------------------
  // 16. If no unseen products,
  // use popular products
  // --------------------------------

  if (recommendations.length === 0) {
    recommendations = [...products]
      .sort((a, b) => {
        const scoreA = (a.sold || 0) * 2 + (a.rating || 0) * 10;

        const scoreB = (b.sold || 0) * 2 + (b.rating || 0) * 10;

        return scoreB - scoreA;
      })
      .slice(0, 6);

    return res.status(200).json({
      recommendations,
      type: "popular-fallback",
    });
  }

  // --------------------------------
  // 17. Return personalized products
  // --------------------------------

  res.status(200).json({
    recommendations: recommendations.slice(0, 6),

    type: "personalized",
  });
});
