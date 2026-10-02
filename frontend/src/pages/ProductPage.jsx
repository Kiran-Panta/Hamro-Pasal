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
// import { categories, server } from "@/main";
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

//   const [show, setShow] = useState(false);
//   const [title, setTitle] = useState("");
//   const [about, setAbout] = useState("");
//   const [stock, setStock] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [btnLoading, setBtnLoading] = useState(false);
//   const [updatedImages, setUpdatedImages] = useState(null);
//   const [activeImg, setActiveImg] = useState(0);

//   const updateHandler = () => {
//     setShow(!show);
//     if (!show && product) {
//       setCategory(product.category);
//       setTitle(product.title);
//       setAbout(product.about);
//       setStock(product.stock);
//       setPrice(product.price);
//     }
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setBtnLoading(true);
//     try {
//       const { data } = await axios.put(
//         `${server}/api/product/${id}`,
//         { title, about, price, stock, category },
//         { headers: { token: Cookies.get("token") } },
//       );
//       toast.success(data.message);
//       fetchProduct(id);
//       setShow(false);
//       setBtnLoading(false);
//     } catch (error) {
//       toast.error(error.response.data.message);
//       setBtnLoading(false);
//     }
//   };

//   const handleSubmitImage = async (e) => {
//     e.preventDefault();
//     setBtnLoading(true);
//     if (!updatedImages || updatedImages.length === 0) {
//       toast.error("Please select new images.");
//       setBtnLoading(false);
//       return;
//     }
//     const formData = new FormData();
//     for (let i = 0; i < updatedImages.length; i++)
//       formData.append("files", updatedImages[i]);
//     try {
//       const { data } = await axios.post(
//         `${server}/api/product/${id}`,
//         formData,
//         {
//           headers: { token: Cookies.get("token") },
//         },
//       );
//       toast.success(data.message);
//       fetchProduct(id);
//       setBtnLoading(false);
//     } catch (error) {
//       toast.error(error.response.data.message);
//       setBtnLoading(false);
//     }
//   };

//   const inputCls = `
//     w-full px-3 py-2.5 text-sm rounded-xl
//     bg-gray-50 dark:bg-[#0d0e10]
//     border border-gray-200 dark:border-gray-700
//     text-gray-800 dark:text-gray-200
//     placeholder-gray-400 dark:placeholder-gray-600
//     focus:outline-none focus:ring-2 focus:ring-[#2874f0]/40 dark:focus:ring-[#5b9cf6]/25
//     focus:border-[#2874f0] dark:focus:border-[#5b9cf6]
//     transition-all duration-200
//   `;

//   const labelCls =
//     "text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1.5 block";

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#f1f3f6] dark:bg-[#0d0e10] flex items-center justify-center">
//         <Loading />
//       </div>
//     );
//   }

//   return (
//     <div
//       style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
//       className="min-h-screen bg-[#f1f3f6] dark:bg-[#0d0e10] text-gray-900 dark:text-gray-100 transition-colors duration-300"
//     >
//       <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
//         {/* Breadcrumb */}
//         <nav className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mb-6">
//           {[
//             <Link to="/">Home</Link>,
//             <Link to="/products">Shop</Link>,
//             product?.title,
//           ]
//             .filter(Boolean)
//             .map((crumb, i, arr) => (
//               <span key={i} className="flex items-center gap-1">
//                 {i > 0 && <ChevronRight className="h-3 w-3" />}
//                 <span
//                   className={
//                     i === arr.length - 1
//                       ? "text-[#2874f0] dark:text-[#5b9cf6] font-semibold truncate max-w-[180px]"
//                       : "hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer capitalize"
//                   }
//                 >
//                   {crumb}
//                 </span>
//               </span>
//             ))}
//         </nav>

//         <Link to="/">Home</Link>

//         {/* ── Admin Edit Panel ── */}
//         {user?.role === "admin" && (
//           <div className="mb-6 bg-white dark:bg-[#17181c] border border-gray-200 dark:border-gray-700/60 rounded-2xl shadow-sm dark:shadow-black/30 overflow-hidden">
//             <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
//               <span className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
//                 <Edit className="h-4 w-4 text-[#2874f0] dark:text-[#5b9cf6]" />
//                 Admin — Edit Product
//               </span>
//               <button
//                 onClick={updateHandler}
//                 className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
//                   show
//                     ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//                     : "bg-[#2874f0] dark:bg-[#1a56c4] text-white hover:bg-[#1a5dc8] dark:hover:bg-[#1447a8]"
//                 }`}
//               >
//                 {show ? (
//                   <>
//                     <X className="h-4 w-4" /> Close
//                   </>
//                 ) : (
//                   <>
//                     <Edit className="h-4 w-4" /> Edit Details
//                   </>
//                 )}
//               </button>
//             </div>

//             {show && (
//               <form
//                 onSubmit={submitHandler}
//                 className="px-6 py-6 grid grid-cols-1 sm:grid-cols-2 gap-5"
//               >
//                 <div>
//                   <label className={labelCls}>Title</label>
//                   <input
//                     className={inputCls}
//                     placeholder="Product Title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className={labelCls}>Category</label>
//                   <select
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     className={inputCls}
//                     required
//                   >
//                     {categories.map((c) => (
//                       <option key={c} value={c}>
//                         {c}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="sm:col-span-2">
//                   <label className={labelCls}>About</label>
//                   <textarea
//                     className={`${inputCls} resize-none`}
//                     rows={3}
//                     placeholder="Product description..."
//                     value={about}
//                     onChange={(e) => setAbout(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className={labelCls}>Price (Rs)</label>
//                   <input
//                     className={inputCls}
//                     type="number"
//                     placeholder="0"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className={labelCls}>Stock</label>
//                   <input
//                     className={inputCls}
//                     type="number"
//                     placeholder="0"
//                     value={stock}
//                     onChange={(e) => setStock(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="sm:col-span-2">
//                   <button
//                     type="submit"
//                     disabled={btnLoading}
//                     className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2874f0] dark:bg-[#1a56c4] hover:bg-[#1a5dc8] disabled:opacity-50 text-white text-sm font-bold transition-all"
//                   >
//                     {btnLoading ? (
//                       <>
//                         <Loader2 className="h-4 w-4 animate-spin" /> Saving...
//                       </>
//                     ) : (
//                       "Save Changes"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             )}
//           </div>
//         )}

//         {/* ── Product Main Section ── */}
//         {product && (
//           <div className="bg-white dark:bg-[#17181c] rounded-2xl border border-gray-200 dark:border-gray-700/60 shadow-sm dark:shadow-black/30 overflow-hidden mb-6">
//             <div className="flex flex-col lg:flex-row">
//               {/* ── Left: Images ── */}
//               <div className="lg:w-[480px] xl:w-[520px] shrink-0 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-gray-800 p-6">
//                 {/* Main image carousel */}
//                 <div className="relative rounded-xl overflow-hidden bg-gray-50 dark:bg-[#0d0e10] mb-4">
//                   <Carousel>
//                     <CarouselContent>
//                       {product.images?.map((image, index) => (
//                         <CarouselItem key={index}>
//                           <img
//                             src={image.url}
//                             alt={`Product image ${index + 1}`}
//                             className="w-full h-[300px] sm:h-[390px] object-contain"
//                           />
//                         </CarouselItem>
//                       ))}
//                     </CarouselContent>
//                     <CarouselPrevious className="left-2 bg-white/90 dark:bg-gray-800/90 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 shadow-md" />
//                     <CarouselNext className="right-2 bg-white/90 dark:bg-gray-800/90 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 shadow-md" />
//                   </Carousel>
//                 </div>

//                 {/* Thumbnail row */}
//                 {product.images?.length > 1 && (
//                   <div className="flex gap-2 flex-wrap">
//                     {product.images.map((img, i) => (
//                       <button
//                         key={i}
//                         onClick={() => setActiveImg(i)}
//                         className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
//                           activeImg === i
//                             ? "border-[#2874f0] dark:border-[#5b9cf6] shadow-md"
//                             : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
//                         }`}
//                       >
//                         <img
//                           src={img.url}
//                           alt=""
//                           className="w-full h-full object-cover"
//                         />
//                       </button>
//                     ))}
//                   </div>
//                 )}

//                 {/* Admin image upload */}
//                 {user?.role === "admin" && (
//                   <form
//                     onSubmit={handleSubmitImage}
//                     className="mt-5 p-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 space-y-3"
//                   >
//                     <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
//                       <ImagePlus className="h-3.5 w-3.5" /> Update Images
//                     </p>
//                     <input
//                       type="file"
//                       multiple
//                       accept="image/*"
//                       onChange={(e) => setUpdatedImages(e.target.files)}
//                       className="block w-full text-xs text-gray-500 dark:text-gray-400
//                         file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0
//                         file:text-xs file:font-semibold
//                         file:bg-[#2874f0]/10 file:text-[#2874f0]
//                         dark:file:bg-[#5b9cf6]/10 dark:file:text-[#5b9cf6]
//                         hover:file:bg-[#2874f0]/20 cursor-pointer"
//                     />
//                     <button
//                       type="submit"
//                       disabled={btnLoading}
//                       className="w-full py-2 rounded-lg bg-[#2874f0] dark:bg-[#1a56c4] hover:bg-[#1a5dc8] disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
//                     >
//                       {btnLoading ? (
//                         <>
//                           <Loader2 className="h-3.5 w-3.5 animate-spin" />{" "}
//                           Uploading...
//                         </>
//                       ) : (
//                         <>
//                           <ImagePlus className="h-3.5 w-3.5" /> Upload Images
//                         </>
//                       )}
//                     </button>
//                   </form>
//                 )}
//               </div>

//               {/* ── Right: Details ── */}
//               <div className="flex-1 p-6 lg:p-8 flex flex-col gap-5">
//                 {/* Category badge */}
//                 <div className="flex items-center gap-2">
//                   <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-blue-50 dark:bg-[#1e2d4a] text-[#2874f0] dark:text-[#5b9cf6] px-3 py-1 rounded-full capitalize">
//                     <Tag className="h-3 w-3" />
//                     {product.category}
//                   </span>

//                   {product.stock > 0 ? (
//                     <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
//                       <CheckCircle2 className="h-3 w-3" /> In Stock
//                     </span>
//                   ) : (
//                     <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-full animate-pulse">
//                       <XCircle className="h-3 w-3" /> Out of Stock
//                     </span>
//                   )}
//                 </div>

//                 {/* Title */}
//                 <div>
//                   <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-snug">
//                     {product.title}
//                   </h1>
//                   {/* Static rating for visual polish */}
//                   <div className="flex items-center gap-2 mt-2">
//                     <div className="flex items-center gap-0.5">
//                       {[1, 2, 3, 4, 5].map((s) => (
//                         <Star
//                           key={s}
//                           className={`h-4 w-4 ${s <= 4 ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-gray-600"}`}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-xs text-gray-400 dark:text-gray-500">
//                       (128 reviews)
//                     </span>
//                   </div>
//                 </div>

//                 {/* Price */}
//                 <div className="flex items-end gap-3">
//                   <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
//                     Rs{product.price?.toLocaleString()}
//                   </span>
//                   <span className="text-sm text-gray-400 dark:text-gray-500 line-through mb-1">
//                     Rs{Math.round(product.price * 1.2)?.toLocaleString()}
//                   </span>
//                   <span className="text-sm font-bold text-emerald-500 mb-1">
//                     17% off
//                   </span>
//                 </div>

//                 {/* Divider */}
//                 <div className="h-px bg-gray-100 dark:bg-gray-800" />

//                 {/* About */}
//                 <div>
//                   <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
//                     About this product
//                   </p>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
//                     {product.about}
//                   </p>
//                 </div>

//                 {/* Stock info */}
//                 {product.stock > 0 && (
//                   <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
//                     <Package className="h-3.5 w-3.5 text-[#2874f0] dark:text-[#5b9cf6]" />
//                     Only{" "}
//                     <span className="font-bold text-gray-800 dark:text-gray-200 mx-1">
//                       {product.stock}
//                     </span>{" "}
//                     left in stock
//                   </div>
//                 )}

//                 {/* CTA */}
//                 <div className="mt-auto pt-2">
//                   {isAuth ? (
//                     product.stock <= 0 ? (
//                       <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 text-red-500 dark:text-red-400 text-sm font-semibold w-fit">
//                         <XCircle className="h-4 w-4" /> Out of Stock
//                       </div>
//                     ) : (
//                       <button
//                         onClick={() => addToCart(id)}
//                         className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#2874f0] dark:bg-[#1a56c4] hover:bg-[#1a5dc8] dark:hover:bg-[#1447a8] text-white text-sm font-bold shadow-md shadow-blue-500/20 dark:shadow-blue-900/30 transition-all active:scale-[0.98]"
//                       >
//                         <ShoppingCart className="h-4 w-4" />
//                         Add to Cart
//                       </button>
//                     )
//                   ) : (
//                     <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-50 dark:bg-[#1e2d4a] border border-blue-200 dark:border-blue-800/40 text-[#2874f0] dark:text-[#5b9cf6] text-sm font-semibold w-fit">
//                       Please log in to add items to cart
//                     </div>
//                   )}
//                 </div>

//                 {/* Delivery & trust badges */}
//                 <div className="grid grid-cols-3 gap-3 pt-2">
//                   {[
//                     {
//                       icon: Truck,
//                       label: "Free Delivery",
//                       sub: "On orders Rs499+",
//                     },
//                     {
//                       icon: Shield,
//                       label: "Secure Payment",
//                       sub: "100% protected",
//                     },
//                     {
//                       icon: RotateCcw,
//                       label: "Easy Returns",
//                       sub: "7-day policy",
//                     },
//                   ].map(({ icon: Icon, label, sub }) => (
//                     <div
//                       key={label}
//                       className="flex flex-col items-center text-center p-3 rounded-xl bg-gray-50 dark:bg-[#0d0e10] border border-gray-100 dark:border-gray-800"
//                     >
//                       <Icon className="h-4 w-4 text-[#2874f0] dark:text-[#5b9cf6] mb-1.5" />
//                       <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
//                         {label}
//                       </span>
//                       <span className="text-[10px] text-gray-400 dark:text-gray-600 mt-0.5">
//                         {sub}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ── Related Products ── */}
//         {relatedProduct?.length > 0 && (
//           <div className="mt-4">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
//                 <span className="w-1 h-5 bg-[#2874f0] dark:bg-[#5b9cf6] rounded-full inline-block" />
//                 Related Products
//               </h2>
//               <span className="text-xs text-gray-400 dark:text-gray-500">
//                 {relatedProduct.length} items
//               </span>
//             </div>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
//               {relatedProduct.map((e) => (
//                 <div
//                   key={e._id}
//                   className="bg-white dark:bg-[#17181c] rounded-xl border border-gray-200 dark:border-gray-700/40 hover:border-[#2874f0]/30 dark:hover:border-[#5b9cf6]/30 shadow-sm hover:shadow-md dark:shadow-black/20 transition-all duration-200 overflow-hidden"
//                 >
//                   <ProductCard product={e} latest={"no"} />
//                 </div>
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
  Edit,
  Loader2,
  X,
  ShoppingCart,
  Tag,
  Package,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Truck,
  Shield,
  RotateCcw,
  ImagePlus,
  Star,
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

//   const likeReview = async (productId, reviewId) => {
//   try {
//     await axios.put(
//       `${server}/api/reviews/like/${productId}/${reviewId}`,
//       {},
//       { headers: { token: Cookies.get("token") } }
//     );

//     fetchProduct(id);
//   } catch (error) {
//     toast.error(error.response?.data?.message);
//   }
// };

const likeReview = async (productId, reviewId) => {
  try {
    const { data } = await axios.put(
      `${server}/api/reviews/${productId}/${reviewId}/like`,
      {},
      {
        headers: {
          token: Cookies.get("token"),
        },
      }
    );

    toast.success("Updated like");
    fetchProduct(productId);
  } catch (error) {
    toast.error(error.response?.data?.message || "Error");
  }
};

const deleteReview = async (productId, reviewId) => {
  try {
    await axios.delete(
      `${server}/api/reviews/${productId}/${reviewId}`,
      {
        headers: { token: Cookies.get("token") },
      }
    );

    toast.success("Review deleted");
    fetchProduct(id);
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
};

const editReview = (review) => {
  setComment(review.comment);
  setRating(review.rating);
  setEditingReviewId(review._id);
};

  const submitReview = async () => {
  if (!rating || !comment) {
    return toast.error("Please add rating and comment");
  }

  try {
    setReviewLoading(true);

    // 🔥 IF editing → update review
    // 🔥 ELSE → create review
    const url = editingReviewId
      ? `${server}/api/reviews/${id}/${editingReviewId}`
      : `${server}/api/reviews/${id}`;

    const method = editingReviewId ? "put" : "post";

    const { data } = await axios({
      method,
      url,
      data: { rating, comment },
      headers: {
        token: Cookies.get("token"),
      },
    });

    toast.success(data.message);

    // reset form
    setRating(0);
    setComment("");
    setEditingReviewId(null);

    fetchProduct(id); // refresh UI
  } catch (error) {
    toast.error(error.response?.data?.message || "Error");
  } finally {
    setReviewLoading(false);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f3f6] dark:bg-[#0d0e10]">
      <div className="max-w-6xl mx-auto p-4">

        {/* ---------------- PRODUCT ---------------- */}
        {product && (
          <div className="bg-white dark:bg-[#17181c] rounded-xl p-5">

            {/* Images */}
            <Carousel>
              <CarouselContent>
                {product.images?.map((img, i) => (
                  <CarouselItem key={i}>
                    <img
                      src={img.url}
                      className="h-[400px] w-full object-contain"
                      alt="product"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            {/* Title */}
            <h1 className="text-2xl font-bold mt-4">{product.title}</h1>

            {/* Price */}
            <p className="text-xl text-blue-600 font-bold mt-2">
              Rs {product.price}
            </p>

            {/* Add to cart */}
            <button
              onClick={() => addToCart(id)}
              className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              <ShoppingCart className="inline w-4 h-4 mr-1" />
              Add to Cart
            </button>

            {/* About */}
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {product.about}
            </p>
          </div>
        )}

        {/* ---------------- REVIEW FORM ---------------- */}
        <div className="mt-8 bg-white dark:bg-[#17181c] p-5 rounded-xl">
          <h2 className="text-lg font-bold mb-3">Write a Review</h2>

          {/* Stars */}
          <div className="flex gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="text-2xl"
              >
                {star <= rating ? "⭐" : "☆"}
              </button>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="w-full border p-3 rounded-lg dark:bg-[#0d0e10]"
          />

          <button
            onClick={submitReview}
            disabled={reviewLoading}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            {reviewLoading ? "Submitting..." : "Submit Review"}
          </button>
        </div>

        {/* ---------------- REVIEWS ---------------- */}
        {/* <div className="mt-8">
          <h2 className="text-xl font-bold mb-3">Reviews</h2>

          {!product?.reviews || product.reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet</p>
          ) : (
            product.reviews.map((r, i) => (
              <div
                key={r._id || i}
                className="border p-3 rounded mb-2 bg-white dark:bg-[#17181c]"
              >
                <p className="font-semibold">{r.name}</p>
                <p>⭐ {r.rating}/5</p>
                <p>{r.comment}</p>
              </div>
            ))
          )}
        </div> */}

        <div className="mt-8">
  <h2 className="text-xl font-bold mb-3">Reviews</h2>

  {!product?.reviews || product.reviews.length === 0 ? (
    <p className="text-gray-500">No reviews yet</p>
  ) : (
    product.reviews.map((r, i) => (
      <div
        key={r._id || i}
        className="border p-4 rounded mb-3 bg-white dark:bg-[#17181c]"
      >
        {/* USER INFO */}
        <div className="flex justify-between items-center">
          <p className="font-semibold">{r.name}</p>

          {/* LIKE BUTTON ❤️ */}
          <button
            onClick={() => likeReview(product._id, r._id)}
            className="text-red-500 text-sm"
          >
            ❤️ {r.likes?.length || 0}
          </button>
        </div>

        {/* RATING */}
        <p className="text-yellow-500">⭐ {r.rating}/5</p>

        {/* COMMENT */}
        <p className="text-gray-700 dark:text-gray-300 mt-1">
          {r.comment}
        </p>

        {/* ACTIONS */}
        {user?._id === r.user && (
          <div className="flex gap-3 mt-2 text-sm">
            
            {/* EDIT */}
            <button
              onClick={() => editReview(r)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>

            {/* DELETE */}
            <button
              onClick={() => deleteReview(product._id, r._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    ))
  )}
</div>

        {/* ---------------- RELATED PRODUCTS ---------------- */}
        {relatedProduct?.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-bold mb-4">Related Products</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {relatedProduct.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductPage;