// import Loading from "@/components/Loading";
// import ProductCard from "@/components/ProductCard";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { CartData } from "@/context/CartContext";
// import { ProductData } from "@/context/ProductContext";
// import { UserData } from "@/context/UserContext";
// import { server } from "@/main";
// import axios from "axios";
// import Cookies from "js-cookie";
// import {
//   Edit,
//   Loader2,
//   X,
//   ShoppingCart,
//   Tag,
//   Package,
//   ChevronRight,
//   CheckCircle2,
//   XCircle,
//   Truck,
//   Shield,
//   RotateCcw,
//   ImagePlus,
//   Star,
// } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Link, useParams } from "react-router-dom";

// const ProductPage = () => {
//   const { fetchProduct, product, relatedProduct, loading } = ProductData();
//   const { addToCart } = CartData();
//   const { id } = useParams();
//   const { isAuth, user } = UserData();

//   useEffect(() => {
//     fetchProduct(id);
//   }, [id]);

//   // ---------------- REVIEW STATE ----------------
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [reviewLoading, setReviewLoading] = useState(false);

//   const [editingReviewId, setEditingReviewId] = useState(null);

// //   const likeReview = async (productId, reviewId) => {
// //   try {
// //     await axios.put(
// //       `${server}/api/reviews/like/${productId}/${reviewId}`,
// //       {},
// //       { headers: { token: Cookies.get("token") } }
// //     );

// //     fetchProduct(id);
// //   } catch (error) {
// //     toast.error(error.response?.data?.message);
// //   }
// // };

// const likeReview = async (productId, reviewId) => {
//   try {
//     const { data } = await axios.put(
//       `${server}/api/reviews/${productId}/${reviewId}/like`,
//       {},
//       {
//         headers: {
//           token: Cookies.get("token"),
//         },
//       }
//     );

//     toast.success("Updated like");
//     fetchProduct(productId);
//   } catch (error) {
//     toast.error(error.response?.data?.message || "Error");
//   }
// };

// const deleteReview = async (productId, reviewId) => {
//   try {
//     await axios.delete(
//       `${server}/api/reviews/${productId}/${reviewId}`,
//       {
//         headers: { token: Cookies.get("token") },
//       }
//     );

//     toast.success("Review deleted");
//     fetchProduct(id);
//   } catch (error) {
//     toast.error(error.response?.data?.message);
//   }
// };

// const editReview = (review) => {
//   setComment(review.comment);
//   setRating(review.rating);
//   setEditingReviewId(review._id);
// };

//   const submitReview = async () => {
//   if (!rating || !comment) {
//     return toast.error("Please add rating and comment");
//   }

//   try {
//     setReviewLoading(true);

//     // 🔥 IF editing → update review
//     // 🔥 ELSE → create review
//     const url = editingReviewId
//       ? `${server}/api/reviews/${id}/${editingReviewId}`
//       : `${server}/api/reviews/${id}`;

//     const method = editingReviewId ? "put" : "post";

//     const { data } = await axios({
//       method,
//       url,
//       data: { rating, comment },
//       headers: {
//         token: Cookies.get("token"),
//       },
//     });

//     toast.success(data.message);

//     // reset form
//     setRating(0);
//     setComment("");
//     setEditingReviewId(null);

//     fetchProduct(id); // refresh UI
//   } catch (error) {
//     toast.error(error.response?.data?.message || "Error");
//   } finally {
//     setReviewLoading(false);
//   }
// };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loading />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f1f3f6] dark:bg-[#0d0e10]">
//       <div className="max-w-6xl mx-auto p-4">

//         {/* ---------------- PRODUCT ---------------- */}
//         {product && (
//           <div className="bg-white dark:bg-[#17181c] rounded-xl p-5">

//             {/* Images */}
//             <Carousel>
//               <CarouselContent>
//                 {product.images?.map((img, i) => (
//                   <CarouselItem key={i}>
//                     <img
//                       src={img.url}
//                       className="h-[400px] w-full object-contain"
//                       alt="product"
//                     />
//                   </CarouselItem>
//                 ))}
//               </CarouselContent>
//               <CarouselPrevious />
//               <CarouselNext />
//             </Carousel>

//             {/* Title */}
//             <h1 className="text-2xl font-bold mt-4">{product.title}</h1>

//             {/* Price */}
//             <p className="text-xl text-blue-600 font-bold mt-2">
//               Rs {product.price}
//             </p>

//             {/* Add to cart */}
//             <button
//               onClick={() => addToCart(id)}
//               className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
//             >
//               <ShoppingCart className="inline w-4 h-4 mr-1" />
//               Add to Cart
//             </button>

//             {/* About */}
//             <p className="mt-4 text-gray-600 dark:text-gray-300">
//               {product.about}
//             </p>
//           </div>
//         )}

//         {/* ---------------- REVIEW FORM ---------------- */}
//         <div className="mt-8 bg-white dark:bg-[#17181c] p-5 rounded-xl">
//           <h2 className="text-lg font-bold mb-3">Write a Review</h2>

//           {/* Stars */}
//           <div className="flex gap-1 mb-3">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <button
//                 key={star}
//                 onClick={() => setRating(star)}
//                 className="text-2xl"
//               >
//                 {star <= rating ? "⭐" : "☆"}
//               </button>
//             ))}
//           </div>

//           <textarea
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             placeholder="Write your review..."
//             className="w-full border p-3 rounded-lg dark:bg-[#0d0e10]"
//           />

//           <button
//             onClick={submitReview}
//             disabled={reviewLoading}
//             className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg"
//           >
//             {reviewLoading ? "Submitting..." : "Submit Review"}
//           </button>
//         </div>

//         {/* ---------------- REVIEWS ---------------- */}
//         {/* <div className="mt-8">
//           <h2 className="text-xl font-bold mb-3">Reviews</h2>

//           {!product?.reviews || product.reviews.length === 0 ? (
//             <p className="text-gray-500">No reviews yet</p>
//           ) : (
//             product.reviews.map((r, i) => (
//               <div
//                 key={r._id || i}
//                 className="border p-3 rounded mb-2 bg-white dark:bg-[#17181c]"
//               >
//                 <p className="font-semibold">{r.name}</p>
//                 <p>⭐ {r.rating}/5</p>
//                 <p>{r.comment}</p>
//               </div>
//             ))
//           )}
//         </div> */}

//         <div className="mt-8">
//   <h2 className="text-xl font-bold mb-3">Reviews</h2>

//   {!product?.reviews || product.reviews.length === 0 ? (
//     <p className="text-gray-500">No reviews yet</p>
//   ) : (
//     product.reviews.map((r, i) => (
//       <div
//         key={r._id || i}
//         className="border p-4 rounded mb-3 bg-white dark:bg-[#17181c]"
//       >
//         {/* USER INFO */}
//         <div className="flex justify-between items-center">
//           <p className="font-semibold">{r.name}</p>

//           {/* LIKE BUTTON ❤️ */}
//           <button
//             onClick={() => likeReview(product._id, r._id)}
//             className="text-red-500 text-sm"
//           >
//             ❤️ {r.likes?.length || 0}
//           </button>
//         </div>

//         {/* RATING */}
//         <p className="text-yellow-500">⭐ {r.rating}/5</p>

//         {/* COMMENT */}
//         <p className="text-gray-700 dark:text-gray-300 mt-1">
//           {r.comment}
//         </p>

//         {/* ACTIONS */}
//         {user?._id === r.user && (
//           <div className="flex gap-3 mt-2 text-sm">
            
//             {/* EDIT */}
//             <button
//               onClick={() => editReview(r)}
//               className="text-blue-600 hover:underline"
//             >
//               Edit
//             </button>

//             {/* DELETE */}
//             <button
//               onClick={() => deleteReview(product._id, r._id)}
//               className="text-red-600 hover:underline"
//             >
//               Delete
//             </button>
//           </div>
//         )}
//       </div>
//     ))
//   )}
// </div>

//         {/* ---------------- RELATED PRODUCTS ---------------- */}
//         {relatedProduct?.length > 0 && (
//           <div className="mt-10">
//             <h2 className="text-lg font-bold mb-4">Related Products</h2>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//               {relatedProduct.map((p) => (
//                 <ProductCard key={p._id} product={p} />
//               ))}
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default ProductPage;



import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CartData } from "@/context/CartContext";
import { ProductData } from "@/context/ProductContext";
import { UserData } from "@/context/UserContext";
import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import {
  CheckCircle2,
  Heart,
  Package,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const ProductPage = () => {
  const { fetchProduct, product, relatedProduct, loading } = ProductData();
  const { addToCart } = CartData();
  const { id } = useParams();
  const { isAuth, user } = UserData();

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  // ---------------- REVIEW STATE ----------------
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);

  // ---------------- LIKE REVIEW ----------------
  const likeReview = async (productId, reviewId) => {
    try {
      await axios.put(
        `${server}/api/reviews/${productId}/${reviewId}/like`,
        {},
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );

      fetchProduct(productId);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  // ---------------- DELETE REVIEW ----------------
  const deleteReview = async (productId, reviewId) => {
    try {
      await axios.delete(
        `${server}/api/reviews/${productId}/${reviewId}`,
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );

      toast.success("Review deleted");
      fetchProduct(id);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error deleting review"
      );
    }
  };

  // ---------------- EDIT REVIEW ----------------
  const editReview = (review) => {
    setComment(review.comment);
    setRating(review.rating);
    setEditingReviewId(review._id);
  };

  // ---------------- SUBMIT REVIEW ----------------
  const submitReview = async () => {
    if (!rating || !comment.trim()) {
      return toast.error("Please add rating and comment");
    }

    try {
      setReviewLoading(true);

      const url = editingReviewId
        ? `${server}/api/reviews/${id}/${editingReviewId}`
        : `${server}/api/reviews/${id}`;

      const method = editingReviewId ? "put" : "post";

      const { data } = await axios({
        method,
        url,
        data: {
          rating,
          comment,
        },
        headers: {
          token: Cookies.get("token"),
        },
      });

      toast.success(data.message);

      setRating(0);
      setComment("");
      setEditingReviewId(null);

      fetchProduct(id);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error submitting review"
      );
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f1f3f6] dark:bg-[#0d0e10]">
        <Loading />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f1f3f6] dark:bg-[#0d0e10]">
        <p className="text-gray-500 dark:text-gray-400">
          Product not found
        </p>
      </div>
    );
  }

  const averageRating =
    product.reviews?.length > 0
      ? (
          product.reviews.reduce(
            (sum, review) => sum + Number(review.rating),
            0
          ) / product.reviews.length
        ).toFixed(1)
      : "0.0";

  const isOutOfStock = Number(product.stock) <= 0;

  return (
    <div className="min-h-screen bg-[#f1f3f6] dark:bg-[#0d0e10] transition-colors">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">

        {/* ================= PRODUCT DETAILS ================= */}
        <div className="bg-white dark:bg-[#17181c] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">

          <div className="grid lg:grid-cols-2">

            {/* ================= IMAGES ================= */}
            <div className="relative p-5 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800">

              <div className="h-[350px] md:h-[480px] flex items-center justify-center bg-gray-50 dark:bg-[#101114] rounded-xl">

                <Carousel className="w-full">
                  <CarouselContent>
                    {product.images?.map((img, i) => (
                      <CarouselItem key={i}>
                        <div className="h-[330px] md:h-[450px] flex items-center justify-center px-8">
                          <img
                            src={img.url}
                            className="max-h-full max-w-full object-contain"
                            alt={product.title}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {product.images?.length > 1 && (
                    <>
                      <CarouselPrevious className="left-2" />
                      <CarouselNext className="right-2" />
                    </>
                  )}
                </Carousel>

              </div>

              {/* IMAGE COUNT */}
              {product.images?.length > 1 && (
                <p className="text-center text-xs text-gray-400 mt-3">
                  {product.images.length} product images
                </p>
              )}

            </div>


            {/* ================= PRODUCT INFORMATION ================= */}
            <div className="p-6 md:p-8 lg:p-10">

              {/* CATEGORY */}
              {product.category && (
                <p className="text-sm font-medium text-[#2874f0] dark:text-[#5b9cf6] uppercase tracking-wide">
                  {product.category}
                </p>
              )}

              {/* TITLE */}
              <h1 className="mt-2 text-2xl md:text-3xl font-bold leading-tight text-gray-900 dark:text-white">
                {product.title}
              </h1>


              {/* RATING */}
              <div className="flex items-center gap-3 mt-4">

                <div className="flex items-center gap-1">

                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.round(Number(averageRating))
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}

                </div>

                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {averageRating}
                </span>

                <span className="text-sm text-gray-400">
                  ({product.reviews?.length || 0} reviews)
                </span>

              </div>


              {/* PRICE */}
              <div className="mt-6">

                <p className="text-3xl font-bold text-[#2874f0] dark:text-[#5b9cf6]">
                  Rs {product.price}
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Inclusive of applicable taxes
                </p>

              </div>


              {/* STOCK */}
              <div className="mt-6">

                {isOutOfStock ? (
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    Out of Stock
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    In Stock
                    <span className="text-gray-400">
                      ({product.stock} available)
                    </span>
                  </div>
                )}

              </div>


              {/* ABOUT */}
              <div className="mt-7 pt-6 border-t border-gray-200 dark:border-gray-800">

                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Product Description
                </h2>

                <p className="mt-3 text-sm md:text-base leading-7 text-gray-500 dark:text-gray-400">
                  {product.about}
                </p>

              </div>


              {/* FEATURES */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-7">

                <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#101114]">
                  <Truck className="w-5 h-5 text-[#2874f0] dark:text-[#5b9cf6]" />

                  <p className="mt-2 text-xs font-medium text-gray-900 dark:text-white">
                    Fast Delivery
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Reliable delivery
                  </p>
                </div>


                <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#101114]">
                  <ShieldCheck className="w-5 h-5 text-[#2874f0] dark:text-[#5b9cf6]" />

                  <p className="mt-2 text-xs font-medium text-gray-900 dark:text-white">
                    Secure Payment
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Safe checkout
                  </p>
                </div>


                <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#101114]">
                  <RotateCcw className="w-5 h-5 text-[#2874f0] dark:text-[#5b9cf6]" />

                  <p className="mt-2 text-xs font-medium text-gray-900 dark:text-white">
                    Easy Shopping
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Simple ordering
                  </p>
                </div>

              </div>


              {/* ADD TO CART */}
              <button
                disabled={isOutOfStock}
                onClick={() => {
                  if (!isAuth) {
                    return toast.error(
                      "Please login to add products to cart"
                    );
                  }

                  addToCart(id);
                }}
                className={`
                  mt-8 w-full
                  flex items-center justify-center gap-2
                  px-6 py-3.5
                  rounded-xl
                  text-sm font-semibold
                  transition
                  ${
                    isOutOfStock
                      ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                      : "bg-[#2874f0] hover:bg-[#1f5fd0] text-white shadow-md hover:shadow-lg"
                  }
                `}
              >
                <ShoppingCart className="w-5 h-5" />

                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </button>

            </div>
          </div>
        </div>


        {/* ================= REVIEWS ================= */}
        <section className="mt-8">

          <div className="bg-white dark:bg-[#17181c] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Customer Reviews
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  See what customers think about this product.
                </p>
              </div>

              <div className="flex items-center gap-3">

                <div className="flex items-center gap-1">

                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(Number(averageRating))
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}

                </div>

                <span className="font-semibold text-gray-900 dark:text-white">
                  {averageRating}/5
                </span>

              </div>

            </div>


            {/* WRITE REVIEW */}
            {isAuth && (
              <div className="mt-8 p-5 rounded-xl bg-gray-50 dark:bg-[#101114]">

                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {editingReviewId
                    ? "Edit Your Review"
                    : "Write a Review"}
                </h3>

                {/* STARS */}
                <div className="flex gap-1 mt-4">

                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    </button>
                  ))}

                </div>


                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience with this product..."
                  rows={4}
                  className="
                    mt-4 w-full
                    border border-gray-200 dark:border-gray-700
                    bg-white dark:bg-[#17181c]
                    text-gray-900 dark:text-white
                    placeholder:text-gray-400
                    rounded-xl p-4
                    outline-none
                    focus:ring-2 focus:ring-[#2874f0]/30
                    focus:border-[#2874f0]
                    resize-none
                  "
                />


                <div className="flex gap-3 mt-4">

                  <button
                    onClick={submitReview}
                    disabled={reviewLoading}
                    className="
                      px-5 py-2.5
                      rounded-lg
                      bg-[#2874f0]
                      hover:bg-[#1f5fd0]
                      text-white
                      text-sm font-medium
                      transition
                      disabled:opacity-50
                    "
                  >
                    {reviewLoading
                      ? "Submitting..."
                      : editingReviewId
                      ? "Update Review"
                      : "Submit Review"}
                  </button>

                  {editingReviewId && (
                    <button
                      onClick={() => {
                        setRating(0);
                        setComment("");
                        setEditingReviewId(null);
                      }}
                      className="
                        px-5 py-2.5
                        rounded-lg
                        border border-gray-300 dark:border-gray-700
                        text-gray-700 dark:text-gray-300
                        text-sm font-medium
                      "
                    >
                      Cancel
                    </button>
                  )}

                </div>

              </div>
            )}


            {/* REVIEW LIST */}
            <div className="mt-8 space-y-4">

              {!product.reviews ||
              product.reviews.length === 0 ? (
                <div className="py-10 text-center">

                  <Star className="w-10 h-10 mx-auto text-gray-300 dark:text-gray-700" />

                  <p className="mt-3 text-gray-500 dark:text-gray-400">
                    No reviews yet.
                  </p>

                  <p className="text-sm text-gray-400">
                    Be the first to review this product.
                  </p>

                </div>
              ) : (
                product.reviews.map((r, i) => (
                  <div
                    key={r._id || i}
                    className="
                      p-5 rounded-xl
                      border border-gray-200 dark:border-gray-800
                      bg-gray-50/50 dark:bg-[#101114]
                    "
                  >

                    <div className="flex justify-between gap-4">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-[#2874f0] text-white flex items-center justify-center font-semibold">
                          {r.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>

                        <div>

                          <p className="font-semibold text-gray-900 dark:text-white">
                            {r.name}
                          </p>

                          <div className="flex items-center gap-1 mt-1">

                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3.5 h-3.5 ${
                                  star <= r.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            ))}

                          </div>

                        </div>

                      </div>


                      {/* LIKE */}
                      <button
                        onClick={() =>
                          likeReview(product._id, r._id)
                        }
                        className="
                          flex items-center gap-1
                          text-sm text-gray-500
                          hover:text-red-500
                          transition
                        "
                      >
                        <Heart
                          className="w-4 h-4"
                          fill="currentColor"
                        />

                        {r.likes?.length || 0}
                      </button>

                    </div>


                    <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                      {r.comment}
                    </p>


                    {/* ACTIONS */}
                    {user?._id === r.user && (
                      <div className="flex gap-4 mt-4 text-sm">

                        <button
                          onClick={() => editReview(r)}
                          className="text-[#2874f0] hover:underline"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteReview(
                              product._id,
                              r._id
                            )
                          }
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>

                      </div>
                    )}

                  </div>
                ))
              )}

            </div>

          </div>

        </section>


        {/* ================= RELATED PRODUCTS ================= */}
        {relatedProduct?.length > 0 && (
          <section className="mt-8">

            <div className="flex items-end justify-between mb-5">

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Related Products
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  You may also like these products.
                </p>
              </div>

              <Link
                to="/products"
                className="text-sm font-medium text-[#2874f0] dark:text-[#5b9cf6] hover:underline"
              >
                View All
              </Link>

            </div>


            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProduct.map((p) => (
                <ProductCard
                  key={p._id}
                  product={p}
                />
              ))}
            </div>

          </section>
        )}

      </div>
    </div>
  );
};

export default ProductPage;