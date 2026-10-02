// import express from "express";
// import { isAuth } from "../middlewares/isAuth.js";
// import { addReview, editReview, deleteReview, likeReview  } from "../controller/review.js";

// const router = express.Router();

// // ⭐ ADD REVIEW ROUTE
// // router.post("/:id", isAuth, addReview);
// router.post("/:id", isAuth, addReview);
// router.put("/:id", isAuth, editReview);
// router.delete("/:id", isAuth, deleteReview);
// router.put("/:id/like", isAuth, likeReview);

// export default router;

import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  addReview,
  editReview,
  deleteReview,
  likeReview,
} from "../controller/review.js";

const router = express.Router();

/* =======================
   REVIEWS (FIXED DESIGN)
======================= */

// ADD review
// router.post("/:productId", isAuth, addReview);

// // EDIT review
// router.put("/:productId/:reviewId", isAuth, editReview);

// // DELETE review
// router.delete("/:productId/:reviewId", isAuth, deleteReview);

// // LIKE review
// router.put("/:productId/:reviewId/like", isAuth, likeReview);

router.post("/:productId", isAuth, addReview);
router.put("/:productId/:reviewId", isAuth, editReview);
router.delete("/:productId/:reviewId", isAuth, deleteReview);
router.put("/:productId/:reviewId/like", isAuth, likeReview);

export default router;