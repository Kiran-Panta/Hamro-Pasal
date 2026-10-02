import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  updateProductImage,
  deleteProduct, 
  getPersonalizedRecommendations,
} from "../controller/product.js";
import uploadFiles from "../middlewares/multer.js";

const router = express.Router();

router.post("/product/new", isAuth, uploadFiles, createProduct);
router.get("/product/all", getAllProducts);
router.get(
  "/product/recommendations",
  isAuth,
  getPersonalizedRecommendations
);
router.get("/product/:id", getSingleProduct);
// router.put("/product/:id", isAuth, updateProduct);
router.put("/product/:id", isAuth, uploadFiles, updateProduct);
router.post("/product/:id", isAuth, uploadFiles, updateProductImage);
router.delete("/product/:id", isAuth, deleteProduct);

export default router;